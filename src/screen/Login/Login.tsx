import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TextInputProps,
  AsyncStorage,
  Platform
} from 'react-native';
import { Icon, Text, Layout, Button, Input } from 'component/common';
import {
  LoginReq,
  login,
  LoginRes,
  loginFb,
  LoginFbReq,
  LoginFbRes
} from 'redux/action/user.action';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Color } from 'theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { global } from 'shared/constant';
import { setError } from 'redux/action/error.action';

// import connectSocket from 'component/socket';

export type loginResult = {
  isCancelled: boolean;
  grantedPermissions?: Array<string>;
  declinedPermissions?: Array<string>;
};

interface Props {
  login: (info: LoginReq) => Promise<LoginRes>;
  loginFb: (info: LoginFbReq) => Promise<LoginFbRes>;
}

const loginField: { [name: string]: TextInputProps } = {
  phone: {
    placeholder: 'SỐ ĐIỆN THOẠI',
    keyboardType: 'number-pad'
  },
  password: {
    placeholder: 'MẬT KHẨU',
    secureTextEntry: true
  }
};

const Login: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [info, setInfo] = useState<LoginReq>({
    phone: '',
    password: ''
  });

  const onSubmit = async () => {
    const response = await props.login(info);
    if (response && response.token) {
      await AsyncStorage.multiSet([
        [global.authStoreKey, response.token],
        [global.stringeeStoreKey, response.stringeeToken]
      ]);
    }
  };

  const handleloginFB = async (dataFBToken: AccessToken | null) => {
    const response = await props.loginFb({ token: dataFBToken!.accessToken });
    if (response && response.id) {
      navigation.navigate('RegisterWithFacebook', {
        accessTokenFB: dataFBToken,
        infoFB: {
          ...response
        }
      });
    }
    if (response && response.token) {
      await AsyncStorage.multiSet([
        [global.authStoreKey, response.token],
        [global.stringeeStoreKey, response.stringeeToken]
      ]);
    }
  };

  const LoginFB = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile'
      ]);
      console.log('[Login facebook]: ', result);
      if (result.isCancelled) {
        dispatch(setError(['Đăng nhập thất bại']));
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();
        handleloginFB(accessToken);
      }
    } catch (error) {
      dispatch(setError([String(error)]));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.green.dark }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={styles.root} color="whiteDark">
          <StatusBar
            backgroundColor={Color.green.dark}
            barStyle="light-content"
            translucent={true}
          />
          <Layout style={[styles.headerWrapper]}>
            <Layout style={[styles.logoWrapper]}>
              <Image
                style={styles.logoImg}
                source={require('resource/logo/logo.png')}
              />
              <Text color="yellow" type="bold" size={24}>
                THU CUC BEAUTY
              </Text>
            </Layout>
            <Layout>
              <Text color="white" type="bold" size={19}>
                Đăng nhập
              </Text>
              <Text align="center" color="white" style={styles.subtitle}>
                Hãy điên số điện thoại và mật khẩu của bạn để tiếp tục đăng
                nhập.
              </Text>
            </Layout>
          </Layout>

          <Layout fullWidth style={[styles.formWrapper]}>
            {Object.keys(loginField).map((field) => (
              <Input
                wrapperStyle={styles.field}
                onChangeText={(text) => setInfo({ ...info, [field]: text })}
                value={info[field as keyof LoginReq]}
                key={`field_${field}`}
                {...loginField[field]}
              />
            ))}
            <Button
              style={[styles.field, { marginTop: 6 }]}
              variant="rounded"
              onPress={onSubmit}
              color="white"
              fullWidth
            >
              <Text color="greenDark">ĐĂNG NHẬP</Text>
            </Button>
            {Platform.OS === 'android' && (
              <Button
                fullWidth
                style={styles.field}
                color="blue"
                variant="rounded"
                onPress={LoginFB}
              >
                <Layout style={{ width: 320 }}>
                  <Layout style={[styles.fbIconPos]}>
                    <Layout style={[styles.iconWrapper]}>
                      <Icon
                        color="white"
                        size={15}
                        type="FontAwesome"
                        name="facebook"
                      />
                    </Layout>
                  </Layout>
                  <Text color="white">ĐĂNG NHẬP VỚI FACEBOOK</Text>
                </Layout>
              </Button>
            )}
            <Button
              onPress={() => navigation.navigate('Register')}
              color="white"
              variant="rounded"
              fullWidth
            >
              <Text align="center" style={{ textTransform: 'uppercase' }}>
                Không có tài khoản?{' '}
                <Text color="green" type="bold">
                  Đăng ký ngay!
                </Text>
              </Text>
            </Button>
          </Layout>
          {/* <Text style={styles.footerText}>
            Bạn cần trợ giúp? Liên lạc hotline{' '}
            <Text type="bold" color="green">
              1900 1920!
            </Text>
          </Text> */}
        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  login,
  loginFb
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  root: {
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: '#055A32'
  },
  headerWrapper: {
    height: 230,
    justifyContent: 'space-between',
    marginTop: 30
  },
  logoWrapper: {
    height: 150,
    justifyContent: 'space-between'
  },
  logoImg: {
    width: 110,
    height: 110
  },
  subtitle: {
    width: 275,
    textAlign: 'center',
    fontSize: 14
  },
  formWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50
  },
  inputText: {
    fontSize: 14,
    width: '100%'
  },
  iconWrapper: {
    width: 26,
    height: 26,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff'
  },
  fbIconPos: {
    position: 'absolute',
    height: '100%',
    width: 60,
    top: 0,
    left: 0
  },
  footerText: {
    marginBottom: 10
  },
  field: {
    marginBottom: 12
  }
});
