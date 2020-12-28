import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'component/common';

const FromInfo: React.FC<{ from: string }> = ({ from }) => (
  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.from} type='bold'>
    {from}
  </Text>
);

const styles = StyleSheet.create({
  from: { fontSize: 17 },
});

export default FromInfo;
