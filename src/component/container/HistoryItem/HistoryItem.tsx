import React from 'react';
import { Item, Text } from 'component/common';
import TimeInfo from 'component/container/TimeInfo/TimeInfo';
import { CallingStatus } from 'constant';
import { ViewProps } from 'react-native';
import FromInfo from '../FromInfo/FromInfo';
import { ICallHistoryInfo } from 'redux/action/call.action';

const To: React.FC<{ to: string; status: keyof typeof CallingStatus }> = ({
  status,
  to
}) => (
  <Text size={13} numberOfLines={2} ellipsizeMode="tail">
    <Text size={13} style={{ color: CallingStatus[status].color }}>
      {status + ' '}
    </Text>
    - {to}
  </Text>
);
export type Props = ICallHistoryInfo & ViewProps;

const HistoryItem: React.FC<Props> = (props: Props) => {
  const { from_name, to_name, initialized_at, type, ...other } = props;

  return (
    <Item
      outlined
      title={<FromInfo from={from_name} />}
      subtitle={<To status={type} to={to_name} />}
      more={<TimeInfo dateTime={initialized_at} />}
      {...other}
    />
  );
};

export default HistoryItem;
