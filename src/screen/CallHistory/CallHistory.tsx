import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ViewStyle,
  FlatList,
  StatusBar,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
import { HistoryItem } from 'component/container';
import { connect } from 'react-redux';
import { Layout } from 'component/common';
import {
  getListCallHistory,
  ListCallHistoriesReq,
  ICallHistoryInfo
} from 'redux/action/call.action';
import { StoreState } from 'redux/store';
import StackHeader from 'component/layout/Header/StackHeader';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from 'theme/color';

interface Props {
  style?: ViewStyle;
  getListCallHistory: (params: ListCallHistoriesReq) => Promise<any>;
}

const CallHistory: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const { getListCallHistory } = props;
  const [listCallHistory, setListCallHistory] = useState<ICallHistoryInfo[]>(
    []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState<number>(0);

  // NOTE: Handle event
  const fetchCallHistory = async (loadPage = 1) => {
    const result = await getListCallHistory({ page: loadPage });
    setTotalItem(result[1]);
    if (loadPage === 1) {
      setListCallHistory(result[0]);
    } else {
      setListCallHistory([...listCallHistory, ...result[0]]);
    }
    setPage(loadPage);
  };

  const pullRefresh = async () => {
    setRefreshing(true);
    await fetchCallHistory();
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (listCallHistory.length < totalItem && !refreshing) {
      await fetchCallHistory(page + 1);
    }
  };

  useEffect(() => {
    fetchCallHistory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white.dark }}>
      <Layout color="whiteDark" fullSize>
        <StatusBar barStyle="dark-content" />
        <StackHeader style={styles.header} title="Lịch sử các cuộc gọi" />
        <FlatList
          data={listCallHistory}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() =>
                navigation.navigate('CallHistoryDetail', {
                  thucucCallId: item.id
                })
              }
            >
              <HistoryItem style={styles.item} {...item} />
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => `history_${item.id}_${index}`}
          style={[styles.list, props.style]}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          initialNumToRender={10}
          refreshing={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => pullRefresh()}
              enabled={true}
              tintColor={Color.blue.normal}
              colors={[Color.blue.normal]}
            />
          }
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.white.dark,
    marginBottom: 15
  },
  list: {
    backgroundColor: Color.white.dark,
    width: '100%',
    paddingHorizontal: 16
  },
  item: {
    marginBottom: 8,
    backgroundColor: Color.white.light
  }
});

const mapStateToProps = (state: StoreState) => ({
  user: state.user
});

export default connect(mapStateToProps, {
  getListCallHistory
})(CallHistory);
