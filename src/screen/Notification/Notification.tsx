import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NotificationItem } from 'component/container';
import { FlatList } from 'react-native-gesture-handler';
import { Layout } from 'component/common';
import { histories } from './data';
import StackHeader from 'component/layout/Header/StackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from 'theme/color';

interface Props { }

const Notification: React.FC<Props> = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white.dark }}>
      <Layout color="whiteDark" fullSize>
        <StatusBar
          backgroundColor={Color.white.dark}
          barStyle="dark-content"
        />
        <StackHeader style={styles.header} title="Thông báo" />
        <FlatList
          data={histories}
          renderItem={({ item }) => (
            <NotificationItem style={styles.item} {...item} />
          )}
          style={styles.list}
          keyExtractor={(item, index) => `history_${item.from}_${index}`}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: '#E5E5E5',
    marginBottom: 10
  },
  itemWrapper: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  item: {
    marginBottom: 12,
    backgroundColor: 'white'
  },
  list: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default Notification;
