import React from 'react';
import { Item, Text } from 'component/common';
import TimeInfo from 'component/container/TimeInfo/TimeInfo';
import FromInfo from 'component/container/FromInfo/FromInfo';
import { StyleSheet, ViewProps } from 'react-native';

interface NotificationProps extends ViewProps {
  from: string;
  content: string;
  createdAt: Date;
}

const Content: React.FC<{ content: string }> = ({ content }) => (
  <Text numberOfLines={2} ellipsizeMode='tail' style={[styles.content]}>
    {content}
  </Text>
);

const NotificationItem: React.FC<NotificationProps> = (props) => {
  const { from, content, createdAt, ...other } = props;

  return (
    <Item
      outlined
      title={<FromInfo from={from} />}
      subtitle={<Content content={content} />}
      more={<TimeInfo dateTime={createdAt} />}
      {...other}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    fontSize: 13,
  },
});

export default NotificationItem;
