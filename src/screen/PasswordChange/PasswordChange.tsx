import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInputProps
} from 'react-native';
import { Text, Layout, Button, Input } from 'component/common';
import { connect, useDispatch } from 'react-redux';

import { Color } from 'theme/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContainerView from 'component/layout/ContainerView';
import StackHeader from 'component/layout/Header/StackHeader';
import {
  changePassword,
  ChangePasswordReq,
  ChangePasswordRes
} from 'action/user.action';
import { setError } from 'redux/action/error.action';
import { useNavigation } from '@react-navigation/native';

interface Props {
  changePassword: (info: ChangePasswordReq) => Promise<ChangePasswordRes>;
}

const registerField: { [name: string]: TextInputProps } = {
  currentPassword: {
    placeholder: 'Mật khẩu hiện tại',
    secureTextEntry: true
  },
  newPassword: {
    placeholder: 'Mật khẩu mới',
    secureTextEntry: true
  }
};

const PasswordChange: React.FC<Props> = (props: Props) => {
  const { changePassword } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [info, setInfo] = useState<ChangePasswordReq>({
    currentPassword: '',
    newPassword: ''
  });

  const onSubmit = async () => {
    const { currentPassword, newPassword } = info;
    try {
      await changePassword({ currentPassword, newPassword });
      dispatch(setError(['Thay đổi mật khẩu thành công']));
      navigation.navigate('Home');
    } catch (err) {
      dispatch(setError([String(err)]));
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
          <StatusBar
            backgroundColor={Color.white.dark}
            barStyle="dark-content"
          />
          <StackHeader title="Đổi mật khẩu" />
          <ContainerView>
            <Layout style={{ marginBottom: 10, marginTop: 60 }}>
              <Text style={styles.moreHeaderInfo} color="blackLight">
                Yêu cầu thay đổi mật khẩu
              </Text>
            </Layout>
            <KeyboardAvoidingView behavior="position">
              {Object.keys(registerField).map((field) => (
                <Layout style={styles.fieldWrapper} color="white">
                  <Input
                    {...registerField[field]}
                    key={`field_${field}`}
                    onChangeText={(text) => setInfo({ ...info, [field]: text })}
                    value={info[field as keyof ChangePasswordReq]}
                  />
                </Layout>
              ))}
            </KeyboardAvoidingView>
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
          </ContainerView>
        </Layout>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);

const styles = StyleSheet.create({
  headerWrapper: {
    height: 50,
    position: 'absolute',
    top: 0
  },
  content: {
    marginTop: 70
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
