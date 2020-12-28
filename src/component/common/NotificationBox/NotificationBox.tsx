import React from 'react';
import { StyleSheet, StatusBar, Keyboard } from 'react-native';
import Layout from '../Layout/Layout';
import Text from '../Text/AppText';
import Button from '../Button/Button';

interface Props {
  messages?: string[];
  onClose?: () => void;
}

const NotificationBox: React.FC<Props> = (props: Props) => {
  const { messages = [], onClose } = props;
  Keyboard.dismiss();

  return (
    <Layout fullSize color="transparent" style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      <Layout fullWidth color="white" style={styles.box}>
        <Layout fullWidth>
          <Text color="greenDark" type="bold" size={17}>
            Thông báo
          </Text>
        </Layout>
        <Layout fullWidth style={styles.messages}>
          {messages.map((message) => (
            <Text style={styles.message} align="left" color="black" size={14}>
              {message.charAt(0).toUpperCase() + message.slice(1)}
            </Text>
          ))}
        </Layout>

        <Button
          style={styles.closeBtn}
          size={35}
          color="green"
          onPress={onClose}
        >
          <Text color="white" type="bold">
            Đồng ý
          </Text>
        </Button>
      </Layout>
    </Layout>
  );
};

export default NotificationBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 9999,
    flex: 1
  },
  box: {
    width: 350,
    borderRadius: 10,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 15,
    paddingTop: 15,
    justifyContent: 'space-around'
  },
  closeBtn: {
    height: 36,
    width: 100,
    borderRadius: 5
  },
  messages: {
    paddingTop: 10,
    paddingBottom: 20
  },
  message: {
    marginBottom: 5
  }
});
