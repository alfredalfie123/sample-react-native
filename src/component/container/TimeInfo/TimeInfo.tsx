import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'component/common';
import moment from 'moment';

const TimeInfo: React.FC<{ dateTime: Date }> = ({ dateTime }) => {
  let time = moment(dateTime).format('D MMM');
  if (moment(new Date()).diff(dateTime, 'day') < 3) {
    time = moment(dateTime).fromNow(true);
  }
  return (
    <Text style={[styles.more]}>
      {time}
    </Text>
  );
};

const styles = StyleSheet.create({
  more: {
    fontSize: 12,
    textAlign: 'right',
  },
});
export default TimeInfo;
