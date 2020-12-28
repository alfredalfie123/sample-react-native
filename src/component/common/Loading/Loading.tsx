import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  BackHandler
} from 'react-native';

const height = Dimensions.get('screen').height;
const Loading: React.FC = () => {
  useEffect(() => {
    const backListen = BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
    return () => {
      backListen.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.75)" barStyle="dark-content" />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: 100000
  }
});
