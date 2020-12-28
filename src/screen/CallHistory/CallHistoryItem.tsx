import React from 'react';
import { StyleSheet, ViewStyle, FlatList } from 'react-native';
import { HistoryItem } from 'component/container';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { ICallHistoryInfo } from 'redux/action/call.action';
import { Color } from 'theme/color';

interface Props {
  style?: ViewStyle;
  listCallHistory: ICallHistoryInfo[];
}

const CallHistoryItem: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const { listCallHistory } = props;

  return (
    <FlatList
      data={listCallHistory}
      renderItem={({ item }) => (
        <TouchableHighlight
          style={styles.itemWrapper}
          underlayColor="transparent"
          onPress={() =>
            navigation.navigate('CallHistoryDetail', { thucucCallId: item.id })
          }
        >
          <HistoryItem style={styles.item} {...item} />
        </TouchableHighlight>
      )}
      keyExtractor={(item, index) => `history_${item.id}_${index}`}
      style={[styles.list, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Color.white.dark
  },
  list: {
    backgroundColor: Color.white.dark
  },
  item: {
    marginBottom: 8,
    backgroundColor: 'white'
  }
});

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CallHistoryItem);
