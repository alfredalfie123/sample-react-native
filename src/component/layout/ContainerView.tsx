import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  flexGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

interface Props extends ViewProps {
  children?: ReactNode;
  maxWidthStyle?: any;
}

const ContainerView = (props: Props) => {
  const { children, ...viewProps } = props;
  return (
    <View style={styles.flexGroup} {...viewProps}>
      <View style={[{ marginHorizontal: 16 }, props.maxWidthStyle]}>
        {children}
      </View>
    </View>
  );
};

export default ContainerView;
