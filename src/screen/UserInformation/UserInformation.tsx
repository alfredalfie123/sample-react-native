import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TextInputProps,
  TouchableWithoutFeedback,
  Alert,
  Platform
} from 'react-native';
import {
  getInfo,
  getNation,
  getCity,
  getDistrict,
  updateProfile
} from 'redux/action/user.action';
import {
  IUserResponse,
  INation,
  ICity,
  IDistict,
  IUserUpdate
} from '../../model/user.model';
import { connect } from 'react-redux';
import { Layout, Text, Button, Input } from 'component/common';
import { Color } from 'theme/color';
import ContainerView from 'component/layout/ContainerView';
import StackHeader from 'component/layout/Header/StackHeader';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  getInfo: () => Promise<IUserResponse>;
  getNation: () => Promise<INation[]>;
  getCity: (id: number | string) => Promise<ICity[]>;
  getDistrict: (id: number | string) => Promise<IDistict[]>;
  updateProfile: (user: IUserUpdate) => Promise<void>;
}

const FieldInput: { [name: string]: TextInputProps } = {
  // email: {
  //   placeholder: 'EMAIL'
  // },
  // codeCell: {
  //   placeholder: 'MÃ PIN',
  //   secureTextEntry: true
  // },
  name: {
    placeholder: 'HỌ VÀ TÊN'
  },
  phone: {
    placeholder: 'SỐ ĐIỆN THOẠI'
  },
  address: {
    placeholder: 'SỐ NHÀ VÀ TÊN PHỐ'
  }
};

const UserInformation: React.FC<Props> = (props: Props) => {
  const {} = props;
  // const navigation = useNavigation();

  const [info, setInfo] = useState<IUserResponse>({} as IUserResponse);
  const [nations, setNations] = useState<INation[]>([] as INation[]);
  const [cities, setCities] = useState<ICity[]>([] as ICity[]);
  const [disticts, setDisticts] = useState<IDistict[]>([] as IDistict[]);
  const FieldPicker: {
    [name: string]: Array<{ label: string; value: number | null | string }>;
  } = {
    gender: [
      {
        label: 'Nam',
        value: 0
      },
      {
        label: 'Nữ',
        value: 1
      }
    ],
    country: [],
    city: [],
    distict: []
  };
  const mapArrayToPicker = (field: string) => {
    switch (field) {
      case 'country':
        nations.map((item) => {
          let tmp = {
            label: item.name,
            value: item.id
          };
          FieldPicker['country'].push(tmp);
        });
        return FieldPicker['country'];
      case 'city':
        cities.map((item) => {
          let tmp = {
            label: item.name,
            value: item.id
          };
          FieldPicker['city'].push(tmp);
        });
        return FieldPicker['city'];
      case 'distict':
        disticts.map((item) => {
          let tmp = {
            label: item.name,
            value: item.id
          };
          FieldPicker['distict'].push(tmp);
        });
        return FieldPicker['distict'];
      case 'gender':
        return FieldPicker['gender'];
      default:
        return [];
    }
  };
  const getUserInfo = async () => {
    try {
      let result = await props.getInfo();
      setInfo(result);
    } catch (err) {
      console.log(err);
    }
  };
  const getNation = async () => {
    try {
      let result = await props.getNation();
      setNations(result);
    } catch (err) {
      console.log(err);
    }
  };
  const getCity = async () => {
    try {
      if (info.idNation) {
        let result = await props.getCity(info.idNation);
        setCities(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getDistrict = async () => {
    try {
      if (info.idProvince) {
        let result = await props.getDistrict(info.idProvince);
        setDisticts(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async () => {
    try {
      await updateUser();
    } catch (err) {
      throw new Error(err);
    }
  };
  // const goBack = () => {
  //   navigation.navigate("Login");
  // };
  const switchSelect = (select: string) => {
    switch (select) {
      case 'city':
        return 'Thành phố';
      case 'distict':
        return 'Quận/Huyện';
      case 'country':
        return 'Đất nước';
      case 'gender':
        return 'Giới tính';
      default:
        return 'Mời bạn chọn';
    }
  };
  const realField = (field: string) => {
    switch (field) {
      case 'gender':
        return 'gender';
      case 'country':
        return 'idNation';
      case 'city':
        return 'idProvince';
      case 'distict':
        return 'idDistrict';
      default:
        return '';
    }
  };
  const updateUser = async () => {
    const { gender, address, idNation, idProvince, idDistrict } = info;
    let postUser = {
      gender,
      address,
      idNation: idNation ? idNation : null,
      idProvince: idProvince ? +idProvince : null,
      idDistrict: idDistrict ? +idDistrict : null
    };
    try {
      let result = await props.updateProfile(postUser);
      Alert.alert('Sửa thông tin thành công');
      console.log('---result', result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserInfo();
    getNation();
  }, []);
  useEffect(() => {
    getCity();
  }, [info.idNation]);
  useEffect(() => {
    getDistrict();
  }, [info.idProvince]);
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
          <StackHeader title="Thông tin cá nhân" />
          <ContainerView>
            {/* <Layout style={{ marginBottom: 10, marginTop: 60 }}>
              <Text style={styles.moreHeaderInfo} color="blackLight">
                Diam augue consequat risus venenatis diam.
              </Text>
            </Layout> */}
            <KeyboardAvoidingView behavior="position">
              <Layout
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                {Object.keys(FieldInput).map((field, index) => (
                  <>
                    <Layout
                      style={[styles.fieldWrapper, FieldInput[field].style]}
                      key={`field_${field}` + index}
                      color="white"
                    >
                      <Input
                        editable={
                          field === 'phone' || field === 'name' ? false : true
                        }
                        {...FieldInput[field]}
                        onChangeText={(text) =>
                          setInfo({ ...info, [field]: text })
                        }
                        value={info[field as keyof IUserResponse]}
                      />
                    </Layout>
                    {/* {index === 1 && (
                      <Layout
                        style={{
                          alignItems: 'flex-start',
                          marginTop: 14
                        }}
                      >
                        <Text
                          style={[
                            styles.moreHeaderInfo,
                            { fontSize: 12, fontStyle: 'italic' }
                          ]}
                          color="blackLight"
                        >
                          *Việc thay đổi mã PIN đòi hỏi cần nhập mã OTP
                        </Text>
                      </Layout>
                    )} */}
                  </>
                ))}
                <>
                  {Object.keys(FieldPicker).map((field) => (
                    <Layout
                      style={[
                        Platform.OS === 'android'
                          ? styles.pickerWrapper
                          : styles.fieldWrapper,
                        field === 'gender' || field === 'distict'
                          ? { width: '100%' }
                          : { width: '48%' }
                      ]}
                      color="white"
                    >
                      <RNPickerSelect
                        onValueChange={(value) => {
                          setInfo({ ...info, [realField(field)]: value });
                        }}
                        style={pickerStyle}
                        placeholder={{
                          label: switchSelect(field),
                          value: null
                        }}
                        value={
                          field === 'distict'
                            ? info[realField(field) as keyof IUserResponse]
                            : +info[realField(field) as keyof IUserResponse]
                        }
                        items={mapArrayToPicker(field)}
                      />
                    </Layout>
                  ))}
                </>
              </Layout>
            </KeyboardAvoidingView>
            <Layout>
              <Button
                style={{ width: '100%', marginTop: 22 }}
                color="green"
                onPress={onSubmit}
                variant="rounded"
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
  getInfo,
  getNation,
  getCity,
  getDistrict,
  updateProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInformation as any);

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
  pickerWrapper: {
    // height: 50,
    // borderRadius: 25,
    // width: '100%',
    // marginBottom: 15,
    // paddingLeft: 20,
    // paddingRight: 200,
    // alignItems: 'flex-start'
    height: 50,
    borderRadius: 25,
    width: '100%',
    marginBottom: 20,
    paddingLeft: 20,
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
    marginBottom: 8
  }
});
const pickerStyle = {
  inputIOS: {
    // height: 50,
    // borderRadius: 25,
    // width: '100%',
    // paddingLeft: 10,
    // paddingRight: 10
  },
  inputAndroid: {
    height: 50,
    borderRadius: 25,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10
  }
};
