import React, { useState, useRef, useEffect } from 'react';
import { Text } from 'component';
import {
  StyleSheet,
  StatusBar,
  Keyboard,
  AsyncStorage,
  Platform,
  Dimensions,
  DeviceEventEmitter,
  AppState,
  AppStateStatus
} from 'react-native';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import ModalPermission from '../../component/ModalPermission';
import { connect, useDispatch } from 'react-redux';
import { logout } from 'redux/action/user.action';
import { Button, Layout, Icon, Loading } from 'component/common';
import { StoreState } from 'redux/store';
import { IUserState } from 'redux/reducer/user.reducer';
import {
  getListCallHistory,
  ListCallHistoriesReq,
  ICallHistoryInfo,
  pickUpPhone,
  hangUpPhone,
  incomingWait
} from 'redux/action/call.action';
import CallHistoryItem from 'screen/CallHistory/CallHistoryItem';
import { Color } from 'theme/color';
import { useNavigation } from '@react-navigation/native';
import {
  ClientConnectionInfo,
  ClientErrorListener,
  IncomingCallListener,
  RegisterPush,
  ClientConnect,
  ClientDisConnect,
  UnregisterPush
} from 'stringee/client.type';
import { LoginManager } from 'react-native-fbsdk';
import { setError } from 'action/error.action';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from './HomeHeader/HomeHeader';
import { disconnectSocket } from 'redux/action/socket.action';
import { IDeviceTokenState } from 'redux/reducer/deviceToken.reducer';
import {
  HandleDeviceTokenReq,
  removeDeviceToken,
  saveDeviceToken
} from 'redux/action/deviceToken.action';
import {
  registerForegroundService,
  registerToken
} from 'shared/util/firebase.util';
import { global } from 'shared/constant';
import OtherPermission from '../../shared/util/otherPermission';
import RNDrawOverlay from '../../shared/util/drawOverAppPermission';
import RNCallKeep from 'react-native-callkeep';
import VoipPushNotification from 'react-native-voip-push-notification';
import { removeLoading, setLoading } from 'redux/action/loading.action';
import { useSocket } from 'component/SocketProvider';

interface Props {
  user: IUserState;
  getListCallHistory: (params: ListCallHistoriesReq) => Promise<any>;
  socket: Boolean;
  disconnectSocket: () => Promise<void>;
  deviceToken: IDeviceTokenState;
  saveDeviceToken: (data: HandleDeviceTokenReq) => Promise<void>;
  removeDeviceToken: (data: HandleDeviceTokenReq) => Promise<void>;
  delayReducer: boolean;
  refreshToken: () => Promise<any>;
}

const iOS = Platform.OS === 'ios';

let intervalId: any;

const Home: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [callPressed, setCallPressed] = useState(false);
  const [myUserId, setMyUserId] = useState('');
  const [listLatestCallHistory, setListLatestCallHistory] = useState<
    ICallHistoryInfo[]
  >([]);
  const [delay, setDelay] = useState(0);
  const [askPermission, setAskPermission] = useState(false);

  const appState = useRef(AppState.currentState);
  const [needReconnect, setNeedReconnect] = useState(false);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      dispatch(setLoading());
      setNeedReconnect(true);
    }
    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };

  useEffect(() => {
    if (needReconnect) {
      const timeoutId = setTimeout(() => {
        setNeedReconnect(false);
        dispatch(removeLoading());
        clearTimeout(timeoutId);
      }, 2000);
    }
  }, [needReconnect]);

  const ratio =
    Dimensions.get('window').width / Dimensions.get('window').height;

  useEffect(() => {
    if (iOS) {
      VoipPushNotification.requestPermissions(); // required
      VoipPushNotification.addEventListener(
        'register',
        async (token: string) => {
          console.log('==== voip token', token);
          await AsyncStorage.setItem('voipKey', token);
        }
      );

      VoipPushNotification.addEventListener(
        'notification',
        (notification: any) => {
          const { uuid } = notification._data;
          let ringing = true;
          console.log('====== notification _data', notification);
          const removeAllListeners = () => {
            RNCallKeep.removeEventListener('answerCall');
            RNCallKeep.removeEventListener('endCall');
          };

          RNCallKeep.addEventListener('answerCall', ({ callUUID }) => {
            ringing = false;
            // RNCallKeep.endCall(uuid);
            dispatch(pickUpPhone());
          });

          RNCallKeep.addEventListener('endCall', ({ callUUID }) => {
            if (ringing) {
              ringing = false;
              dispatch(hangUpPhone());
            }
            removeAllListeners();
          });

          // Handle incoming pushes
          RNCallKeep.displayIncomingCall(
            uuid,
            'Thu cúc Beauty',
            'Thu cúc Beauty',
            'number',
            true
          );
        }
      );
    } else {
      const channelConfig = {
        id: 'thucucbeauty',
        name: 'Thu Cuc Beauty',
        description: 'Cuộc gọi đang diễn ra',
        enableVibration: false
      };
      VIForegroundService.createNotificationChannel(channelConfig);
      const unsub = registerForegroundService();
      return unsub;
    }

    return () => {};
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchCallHistory = async () => {
        const size = ratio > 0.54 ? 2 : 3;
        const result = await props.getListCallHistory({ page: 1, size });
        setListLatestCallHistory(result[0]);
      };
      fetchCallHistory();
      setCallPressed(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    requestOtherPermission();
  }, []);

  const requestOtherPermission = async () => {
    if (Platform.OS === 'android') {
      let manufacturer = await OtherPermission.getManufacturer();
      console.log('manufacturer', manufacturer);
      if (manufacturer === 'Xiaomi') {
        let hasPermission = await OtherPermission.hasPermission();
        console.log('hasPermission', hasPermission);
        if (!hasPermission) {
          setAskPermission(true);
        }
      } else {
        RNDrawOverlay.askForDispalayOverOtherAppsPermission()
          .then((res: any) => {
            // res will be true if permission was granted
            console.log('Accept Display over other apps permission', res);
            console.log(res);
          })
          .catch((e: any) => {
            // permission was declined
            console.log('Decline display over other apps permission', e);
          });
      }
    }
  };

  useEffect(() => {
    if (props.delayReducer) {
      setDelay(3);
      intervalId = setInterval(() => {
        setDelay((prevDelay) => prevDelay - 1);
      }, 1000);
    }
  }, [props.delayReducer]);

  useEffect(() => {
    if (delay === -1) {
      dispatch({ type: 'CLEAR_DELAY' });
      setDelay(0);
      clearInterval(intervalId);
    }
  }, [delay]);

  useEffect(() => {
    (async () => {
      if (!props.deviceToken.saved) {
        const deviceToken = await registerToken();
        await props.saveDeviceToken({ deviceToken });
        const unsub = registerForegroundService();
        return unsub;
      }
    })();
  }, []);

  const onConnect = async ({ userId }: ClientConnectionInfo) => {
    console.log('On Connect - ' + userId);
    if (iOS) {
      VoipPushNotification.registerVoipToken();
    }
    setMyUserId(userId);
  };

  const onDisConnect = ({ userId }: ClientConnectionInfo) => {
    console.log('On Did DisConnect', userId);
    setMyUserId('');
    // dispatch(setError(['Mất kết nối với Stringee']));
  };

  const onFailWithError: ClientErrorListener = ({ message }) => {
    dispatch(setError([message]));
  };

  const onRequestAccessToken = async () => {
    dispatch(setError(['Phiên đăng nhập đã hết hạn, hãy đăng nhập lại.']));
    await logoutHandler();
    // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
    // this.refs.client.connect("NEW_TOKEN");
  };

  const logoutHandler = async () => {
    if (props.user.loginFb) {
      LoginManager.logOut();
    }
    if (iOS) {
      const voipToken = await AsyncStorage.getItem('voipKey');
    }
    const deviceToken = await AsyncStorage.getItem(global.fcmKey);
    if (deviceToken) {
      await props.removeDeviceToken({ deviceToken });
    }
    await AsyncStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('accept_background_call', (data) => {
      const { call_id } = data;
      // dispatch({
      //   type: ResponseIncommingKeys.WAIT,
      //   payload: { callId: call_id },
      // });
      console.log('Should navigate to VideoCall ******************', call_id);
      navigation.navigate('VideoCall', {
        callId: call_id,
        from: 'Thu Cúc',
        to: 'You',
        callType: 'Incoming'
      });
    });
  }, []);

  const onIncomingCall: IncomingCallListener = (info) => {
    const { callId, from, to } = info;
    console.log(AppState.currentState);
    if (AppState.currentState === 'active' && !iOS) {
      dispatch(incomingWait(callId));
    }
    navigation.navigate('VideoCall', {
      callId: callId,
      from: from,
      to: to,
      callType: 'Incoming'
    });
  };

  // Action
  const onVideoCallButtonPress = async () => {
    if (!props.delayReducer) {
      if (!!myUserId && !callPressed) {
        Keyboard.dismiss();
        console.log('_onVideoCallButtonPress');
        setCallPressed(true);
        navigation.navigate('VideoCall', {
          from: myUserId,
          to: 'admin',
          callType: 'Outgoing'
        });
      } else if (!myUserId) {
        dispatch(setError(['Không thể kết nối đến tổng đài!']));
      }
    }
  };

  // const callState = useSelector<StoreState, ICallState>((state) => state.call);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.green.dark }}>
      <StatusBar backgroundColor={Color.green.dark} barStyle="light-content" />
      {callPressed && <Loading />}
      <Layout fullSize justify="space-between" color="whiteDark">

        <HomeHeader logoutHandler={logoutHandler} />
        <Layout fullWidth style={styles.historyWrapper}>
          <Layout fullWidth style={[styles.addressButtonWrapper]}>
            <Button
              bordered
              color="white"
              style={[styles.addressButton]}
              onPress={() => navigation.navigate('SystemAddress')}
            >
              <Layout direction="row">
                <Icon
                  type="MaterialIcons"
                  name="location-on"
                  size={22}
                  color="greenDark"
                  style={{ marginRight: 10 }}
                />
                <Text>DANH SÁCH ĐỊA CHỈ HỆ THỐNG</Text>
              </Layout>
            </Button>
          </Layout>
          <Layout
            fullWidth
            direction="row"
            style={[styles.historyTitleWrapper]}
          >
            <Text type="bold" size={18}>
              Lịch sử các cuộc gọi
            </Text>

            {listLatestCallHistory.length > 0 && (
              <Button
                color="white"
                onPress={() => navigation.navigate('CallHistory')}
                style={[styles.moreButton]}
                bordered
              >
                <Text size={12}>Xem thêm</Text>
              </Button>
            )}
          </Layout>
          {listLatestCallHistory.length > 0 ? (
            <CallHistoryItem
              listCallHistory={listLatestCallHistory}
              style={styles.callHistory}
            />
          ) : (
            <Text style={styles.noHistory}>Không có lịch sử cuộc gọi</Text>
          )}
        </Layout>
        <Layout fullWidth style={[styles.addressButtonWrapper]}>
          <Button
            style={{ marginBottom: 15 }}
            color="green"
            height={50}
            variant="rounded"
            onPress={onVideoCallButtonPress}
            fullWidth
          >
            <Layout direction="row">
              <Layout color="white" style={styles.videoIconWrapper}>
                <Icon
                  type="MaterialIcons"
                  color="greenDark"
                  name="videocam"
                  size={22}
                />
              </Layout>
              <Text color="white">
                {props.delayReducer ? 'XIN HÃY ĐỢI ' + delay : 'GỌI VIDEO'}
              </Text>
            </Layout>
          </Button>
        </Layout>
      </Layout>
      {Platform.OS === 'android' && (
        <ModalPermission
          modalVisible={askPermission}
          btnCancel="Hủy"
          btnOk="Cài đặt"
          image={require('./otherpermission.png')}
          onPressOk={() => {
            setAskPermission(false);
            OtherPermission.showSetting();
          }}
          onPressCancel={() => setAskPermission(false)}
          message="Ứng dụng cần cho phép nhận cuộc gọi ở tác vụ nền"
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
  socket: state.socket,
  deviceToken: state.deviceToken,
  delayReducer: state.delay
});

export default connect(mapStateToProps, {
  logout,
  getListCallHistory,
  disconnectSocket,
  saveDeviceToken,
  removeDeviceToken
})(Home as any);

const styles = StyleSheet.create({
  callHistory: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    width: '100%'
  },
  historyTitleWrapper: {
    paddingHorizontal: 20,
    marginBottom: 15,
    justifyContent: 'space-between'
  },
  moreButton: {
    width: 100,
    borderRadius: 40,
    height: 30
  },
  addressButton: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 40
  },
  addressButtonWrapper: {
    paddingHorizontal: 20,
    marginBottom: 15
  },
  videoIconWrapper: {
    marginRight: 15,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  historyWrapper: {
    marginTop: 10,
    minHeight: 0.5 * Dimensions.get('screen').height,
    justifyContent: 'flex-start'
  },
  noHistory: {
    marginTop: 20
  }
});
