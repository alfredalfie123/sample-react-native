import { registerRootComponent } from 'expo';
import 'moment/locale/vi';
import 'text-encoding-polyfill';
import App from './App';
import {registerBackgroundService} from './src/shared/util/firebase.util';
import { AppRegistry } from 'react-native';
import { registerMessagingService } from 'shared/util/firebase.util';
import NotificationService from 'shared/util/notification.util';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
// registerMessagingService();

// AppRegistry.registerHeadlessTask(
//   'ReactNativeFirebaseMessagingHeadlessTask',
//   () => (remoteMessage) => {
//     // console.log('============= FirebaseMessagingHeadlessTask', remoteMessage);

//     // // Make your call here
//     // RNCallKeep.addEventListener('answerCall', () => {
//     //   RNCallKeep.endAllCalls();
//     //   RNCallKeep.backToForeground();
//     // });
//     // RNCallKeep.displayIncomingCall('thucuc', 'thucuc');

//     // const notification = remoteMessage.notification;
//     // NotificationService.sendLocalNotification({
//     //   title: notification?.title + 'LOCAL',
//     //   actions: '["Đồng ý", "Từ chối"]',
//     //   message: notification?.body || '',
//     //   soundName: 'bigcityboi.mp3',
//     //   playSound: true
//     // });
//     return Promise.resolve();
//   }
// );

registerBackgroundService();
