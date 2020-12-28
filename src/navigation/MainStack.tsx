import React from 'react';
import {
  Home,
  CallHistory,
  Notification,
  UserInformation,
  CallHistoryDetail,
  SystemAddress,
  PasswordChange
} from 'screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="CallHistory"
        component={CallHistory}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="CallHistoryDetail"
        component={CallHistoryDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SystemAddress"
        component={SystemAddress}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="UserInformation"
        component={UserInformation}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
