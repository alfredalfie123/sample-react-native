import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import { Platform, AsyncStorage } from 'react-native';
import store from 'redux/store';
import { ErrorKeys } from 'redux/action/error.action';
import { CallEvent, global } from 'constant';
import RNCallKeep from 'react-native-callkeep';
// import NotificationService from './notification.util';
import IncomingCall from 'react-native-incoming-call';
import { DeviceEventEmitter } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  pickUpPhone,
  hangUpPhone,
  incomingWait,
  ResponseIncommingKeys,
  clearIncommingResponse
} from 'redux/action/call.action';

const isIos = Platform.OS === 'ios';

// TODO: Request IOS permissions
async function requestPermissionIOS() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    store.dispatch({
      type: ErrorKeys.SET_ERROR,
      payload: {
        messages: ['Need permissions!']
      }
    });
  }
}

type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;
export async function backgroundHandler(remoteMessage: RemoteMessage) {
  console.log('[RemoteMessage]', remoteMessage);

  if (Platform.OS === 'android') {
    if (remoteMessage.data!.event === CallEvent.incoming) {
      IncomingCall.display(
        'callUUIDv4',
        'Thu Cúc Beauty',
        'https://avatars0.githubusercontent.com/u/71875960?s=400&v=4',
        'Incoming Call'
      );

      DeviceEventEmitter.addListener('endCall', (payload) => {
        console.log('endCall', payload);
        if (payload.isHeadless) {
          // Called from killed state
          console.log('End call headless');
          IncomingCall.openAppFromHeadlessMode(payload.uuid);
          store.dispatch(hangUpPhone());
          IncomingCall.dismiss();
        } else {
          console.log(
            'End call background',
            'CallId',
            remoteMessage.data?.call_id ?? ''
          );
          // Called from background state
          IncomingCall.backToForeground();
          store.dispatch(hangUpPhone());
          IncomingCall.dismiss();
          // DeviceEventEmitter.emit('accept_background_call', { call_id: remoteMessage.data?.call_id ?? '' });
        }
      });
      DeviceEventEmitter.addListener('answerCall', (payload) => {
        console.log('answerCall', payload);
        if (payload.isHeadless) {
          // Called from killed state
          console.log(
            'Answer call headless',
            'CallId',
            remoteMessage.data?.call_id ?? ''
          );
          IncomingCall.openAppFromHeadlessMode(payload.uuid);
        } else {
          console.log(
            'Answer call background',
            'CallId',
            remoteMessage.data?.call_id ?? ''
          );
          // Called from background state
          IncomingCall.backToForeground();
        }
        store.dispatch(pickUpPhone());
      });
    } else if (remoteMessage.data!.event === CallEvent.miss) {
      IncomingCall.dismiss();
    }
  }
}

// TODO: register background service
export function registerBackgroundService() {
  console.log('[registerBackgroundService]');
  messaging().setBackgroundMessageHandler(backgroundHandler);
}

// TODO: register background service
export function registerForegroundService() {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    if (
      Platform.OS === 'android' &&
      store.getState().call.responseIncomming === ResponseIncommingKeys.WAIT
    ) {
      console.log('[remoteMessage foreground]: ', remoteMessage.data);

      if (remoteMessage.data?.event === CallEvent.incoming) {
        IncomingCall.display(
          'callUUIDv4',
          'Thu Cúc Beauty',
          'https://avatars0.githubusercontent.com/u/71875960?s=400&v=4',
          'Incoming Call'
        );
        DeviceEventEmitter.addListener('answerCall', (payload) => {
          console.log('==== foreground: payload', payload);
          store.dispatch(pickUpPhone());
        });
        DeviceEventEmitter.addListener('endCall', (payload) => {
          console.log('==== foreground: payload', payload);
          // IncomingCall.dismiss();
          store.dispatch(hangUpPhone());
        });
      } else if (remoteMessage.data!.event === CallEvent.miss) {
        store.dispatch(clearIncommingResponse());
        IncomingCall.dismiss();
      }
    }
  });

  return unsubscribe;
}

// TODO: register background service

// TODO: get token
export async function getFcmToken() {
  let fcmToken = await AsyncStorage.getItem(global.fcmKey);
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    await AsyncStorage.setItem(global.fcmKey, fcmToken);
  }
  console.log('[FCM Token]: ', fcmToken);
  return fcmToken;
}

// TODO: Register firebase token
export async function registerToken() {
  if (isIos) {
    await requestPermissionIOS();
  }
  const token = await getFcmToken();
  await registerBackgroundService();
  // messaging().onNotificationOpenedApp((remoteMessage) => {
  //   console.log('===== [ios remoteMessage]', remoteMessage);
  // });
  return token;
}
