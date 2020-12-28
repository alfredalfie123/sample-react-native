import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInputProps,
  AsyncStorage
} from 'react-native';
import { Text, Layout, Button, Input } from 'component/common';
import { connect } from 'react-redux';
import {
  registerWithFacebook,
  RegisterFacebookReq,
  RegisterFacebookRes
} from 'action/user.action';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Color } from 'theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContainerView from 'component/layout/ContainerView';
import StackHeader from 'component/layout/Header/StackHeader';
import { RootStackParamList } from 'navigation/type';
import { global } from 'shared/constant';

interface Props {
  registerWithFacebook: (
    info: RegisterFacebookReq
  ) => Promise<RegisterFacebookRes>;
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
    placeholder: 'MÃ PIN',
    secureTextEntry: true
  }
};

const RegisterWithFacebook: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute<
    RouteProp<RootStackParamList, 'RegisterWithFacebook'>
  >();
  const { accessTokenFB } = route.params;
  const [info, setInfo] = useState<RegisterFacebookReq>({
    name: '',
    phone: '',
    password: ''
  });

  const onSubmit = async () => {
    const infoSubmit: RegisterFacebookReq = {
      ...info,
      token: accessTokenFB.accessToken
    };
    const token = await props.registerWithFacebook(infoSubmit);
    if (token && token.token) {
      await AsyncStorage.multiSet([
        [global.authStoreKey, token.token],
        [global.stringeeStoreKey, token.stringeeToken]
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white.dark }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout
          style={{ justifyContent: 'flex-start' }}
          fullSize
          color="whiteDark"
        >
          <StatusBar barStyle="light-content" />
          <StackHeader
            title="Đăng ký"
            color="green"
            titleColor="white"
            iconColor="white"
          />
          <ContainerView>
            <Layout style={{ marginBottom: 10, marginTop: 60 }}>
              <Text style={styles.moreHeaderInfo} color="blackLight">
                Hãy điên thông tin của bạn để tiếp tục đăng ký.
              </Text>
            </Layout>
            <KeyboardAvoidingView behavior="position">
              {Object.keys(registerField).map((field) => (
                <Layout style={styles.fieldWrapper} color="white">
                  <Input
                    {...registerField[field]}
                    key={`field_${field}`}
                    onChangeText={(text) => setInfo({ ...info, [field]: text })}
                    value={info[field as keyof RegisterFacebookReq]}
                  />
                </Layout>
              ))}
            </KeyboardAvoidingView>
            <Layout style={styles.moreInfo}>
              <Text size={12}>
                Bấm hoàn tất đăng ký là việc bạn đồng ý với{' '}
                <Text size={12} type="bold" color="green">
                  chính sách bảo mật
                </Text>{' '}
                và{' '}
                <Text size={12} type="bold" color="green">
                  điều khoản sử dụng
                </Text>{' '}
                của chúng tôi
              </Text>
            </Layout>
            <Layout>
              <Button
                color="green"
                onPress={onSubmit}
                variant="rounded"
                fullWidth
              >
                <Text color="white">HOÀN TẤT</Text>
              </Button>
            </Layout>
            <Button
              color="transparent"
              onPress={() => navigation.navigate('Login')}
            >
              <Layout style={styles.moreInfo} direction="row">
                <Text size={14} style={{ textTransform: 'uppercase' }}>
                  Đã có tài khoản?
                </Text>
                <Text
                  color="greenDark"
                  type="bold"
                  style={{ textTransform: 'none', paddingLeft: 4 }}
                >
                  Đăng nhập tại đây!
                </Text>
              </Layout>
            </Button>
          </ContainerView>
        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  registerWithFacebook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterWithFacebook);

const styles = StyleSheet.create({
  headerWrapper: {
    height: 50,
    position: 'absolute',
    top: 0
  },
  content: {
    marginTop: 70
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 15,
    width: 30,
    height: '100%'
  },
  fieldWrapper: {
    height: 50,
    borderRadius: 25,
    width: '100%',
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start'
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
    width: 320,
    marginBottom: 10,
    marginTop: 20
  }
});
