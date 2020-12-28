import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TextInputProps,
  AsyncStorage,
  Platform
} from 'react-native';
import { Icon, Text, Layout, Button, Input } from 'component/common';
import { RegisterReq, RegisterRes } from 'redux/action/user.action';
import { connect } from 'react-redux';
import { register } from 'action/user.action';
import { useNavigation } from '@react-navigation/native';
import { Color } from 'theme/color';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccessTokenFB } from 'shared/type/type';
import { global } from 'shared/constant';
import StackHeader from 'component/layout/Header/StackHeader';

interface Props {
  register: (info: RegisterReq) => Promise<RegisterRes>;
}

const registerField: { [name: string]: TextInputProps } = {
  name: {
    placeholder: 'HỌ VÀ TÊN'
  },
  phone: {
    placeholder: 'SỐ ĐIỆN THOẠI',
    keyboardType: 'number-pad'
  },
  password: {
    placeholder: 'MẬT KHẨU',
    secureTextEntry: true
  }
};

const Register: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const [info, setInfo] = useState<RegisterReq>({
    name: '',
    phone: '',
    password: ''
  });

  const onSubmit = async () => {
    const token = await props.register(info);
    if (token && token.token) {
      await AsyncStorage.multiSet([
        [global.authStoreKey, token.token],
        [global.stringeeStoreKey, token.stringeeToken]
      ]);
    }
  };

  const registerFB = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (accessToken: AccessTokenFB) =>
              navigation.navigate('RegisterWithFacebook', {
                accessTokenFB: accessToken
              })
          );
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white.dark }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout justify="flex-start" fullSize color="whiteDark">
          <StatusBar barStyle="light-content" />
          <StackHeader
            title="Đăng ký"
            color="green"
            titleColor="white"
            iconColor="white"
          />

          <Layout style={styles.wrapperAll} fullWidth>
            <Layout fullWidth>
              {Platform.OS === 'android' && (
                <Layout fullWidth>
                  <Text style={styles.moreHeaderInfo} color="blackLight">
                    Đăng ký nhanh với
                  </Text>
                  <Button
                    style={styles.moreHeaderInfo}
                    color="white"
                    variant="rounded"
                    height={43}
                    onPress={registerFB}
                    fullWidth
                  >
                    <Layout justify="flex-start" direction="row">
                      <Icon
                        color="blue"
                        size={28}
                        type="Entypo"
                        name="facebook-with-circle"
                        style={styles.fbIcon}
                      />
                      <Text color="black">FACEBOOK</Text>
                    </Layout>
                  </Button>
                  <Text style={styles.moreHeaderInfo} color="blackLight">
                    hoặc
                  </Text>
                </Layout>
              )}
              <Text style={styles.moreHeaderInfo} color="blackLight">
                Hãy điên thông tin của bạn để tiếp tục đăng ký.
              </Text>
            </Layout>
            {/* <KeyboardAvoidingView behavior="position"> */}
            {Object.keys(registerField).map((field) => (
              <Input
                {...registerField[field]}
                wrapperStyle={styles.field}
                key={`field_${field}`}
                onChangeText={(text) => setInfo({ ...info, [field]: text })}
                value={info[field as keyof RegisterReq]}
              />
            ))}
            {/* </KeyboardAvoidingView> */}
            <Layout fullWidth style={[styles.moreInfo]}>
              <Text size={12}>
                Bấm hoàn tất đăng ký là việc bạn đồng ý với{' '}
                <Text size={12} type="bold" color="greenDark">
                  chính sách bảo mật
                </Text>{' '}
                và{' '}
                <Text size={12} type="bold" color="greenDark">
                  điều khoản sử dụng
                </Text>{' '}
                của chúng tôi
              </Text>
            </Layout>
            <Layout fullWidth>
              <Button
                color="green"
                onPress={onSubmit}
                variant="rounded"
                fullWidth
              >
                <Text color="white">HOÀN TẤT</Text>
              </Button>
            </Layout>
          </Layout>
        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  wrapperAll: {
    paddingHorizontal: 20,
    marginTop: 15
  },
  inputText: {
    fontSize: 14,
    width: '100%'
  },
  formWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  fbIcon: {
    marginRight: 10
  },
  moreHeaderInfo: {
    marginBottom: 18
  },
  moreInfo: {
    marginTop: 20,
    marginBottom: 32
  },
  field: {
    marginBottom: 12
  }
});
