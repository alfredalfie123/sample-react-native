import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, PermissionsAndroid, Platform } from 'react-native';
import { Provider } from 'react-redux';
import store from 'store';
import AuthStack from 'navigation/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNCallKeep from 'react-native-callkeep';
import { SocketProvider } from 'component/SocketProvider';
import getEnvVars from 'redux/environment';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import VoipPushNotification from 'react-native-voip-push-notification';

console.disableYellowBox = true;

const App = () => {
  let [fontsLoaded] = useFonts({
    NotoSans: require('resource/fonts/NotoSans-Regular.ttf'),
    NotoSansBold: require('resource/fonts/NotoSans-Bold.ttf'),
    NotoSansItalic: require('resource/fonts/NotoSans-Italic.ttf')
  });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const options = {
        ios: {
          appName: 'Thu Cúc Beauty'
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription:
            'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
          imageName: 'phone_account_icon',
          additionalPermissions: [
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          ]
        }
      };
      RNCallKeep.setup(options);
    } else {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      ]);
    }
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SocketProvider url={getEnvVars().API_BASE_URL}>
          <AuthStack />
        </SocketProvider>
        {/* <SocketClient /> */}
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
