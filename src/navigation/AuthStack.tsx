import React, { useEffect, useState } from 'react';
import { Login, Register, RegisterWithFacebook } from 'screen';
import {
  createStackNavigator,
  StackHeaderProps
} from '@react-navigation/stack';
import { connect } from 'react-redux';
import { StoreState } from 'redux/store';
import MainStack from './MainStack';
import { IUserState } from 'redux/reducer/user.reducer';
import { Loading, Layout, Text } from 'component/common';
import { persist } from 'redux/action/user.action';
import { NavigationContainer } from '@react-navigation/native';
import { IErrorState } from 'redux/reducer/error.reducer';
import { ILoadingState } from 'redux/reducer/loading.reducer';
import { NotificationBox } from 'component/common';
import { clearError } from 'redux/action/error.action';
import StackHeader from 'component/layout/Header/StackHeader';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

interface Props {
  userState: IUserState;
  errorState: IErrorState;
  loadingState: ILoadingState;
  persist: () => any;
  clearError: () => any;
}

const AuthStack = (props: Props) => {
  const { userState, loadingState, errorState } = props;

  const [networkConnected, setNetworkConnected] = useState(false);

  const header = (props: StackHeaderProps) => {
    const { options } = props.scene.descriptor;
    return (
      <StackHeader goBack={props.navigation.goBack} title={options.title!} />
    );
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnected(state.isConnected);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    NetInfo.fetch().then((state) => {
      setNetworkConnected(state.isConnected);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async () => {
      if (!userState.loadedInfo) {
        await props.persist();
      }
    })();
  }, [userState.loadedInfo]);

  if (!userState.loadedInfo) {
    return <Loading />;
  }

  return (
    <>
      {loadingState.isLoading && <Loading />}
      {!networkConnected && (
        <Layout color="red" style={{ height: 20 }}>
          <Text color="white" size={12}>
            Không có kết nối mạng
          </Text>
        </Layout>
      )}
      {errorState.error && (
        <NotificationBox
          messages={errorState.error.messages}
          onClose={props.clearError}
        />
      )}
      <NavigationContainer>
        {!userState.isLoggedIn ? (
          <Stack.Navigator
            headerMode="screen"
            initialRouteName="Login"
            screenOptions={{ header }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="RegisterWithFacebook"
              component={RegisterWithFacebook}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        ) : (
          <MainStack />
        )}
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  userState: state.user,
  loadingState: state.loading,
  errorState: state.error
});

export default connect(mapStateToProps, {
  persist,
  clearError
})(AuthStack);
