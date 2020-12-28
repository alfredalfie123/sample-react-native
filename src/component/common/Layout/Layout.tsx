import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  FlexAlignType
} from 'react-native';
import { LayoutBackground } from 'theme/color';
import { pushStyle } from 'shared/util/util';

interface LayoutProps extends ViewProps {
  color?: keyof typeof LayoutBackground;
  children?: any;
  fullSize?: boolean;
  direction?: 'column' | 'row';
  fullWidth?: boolean;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: FlexAlignType;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {
    color = 'transparent',
    children,
    fullSize = false,
    fullWidth = false,
    justify = 'center',
    align = 'center',
    direction = 'column',
    style,
    ...viewProps
  } = props;
  const originStyle: ViewStyle = {
    backgroundColor: LayoutBackground[color],
    justifyContent: justify,
    alignItems: align,
    flexDirection: direction
  };
  let styleArr = [originStyle];
  // TODO: Push more styles
  styleArr = pushStyle(fullSize, styleArr, styles.fullSize);
  styleArr = pushStyle(fullWidth, styleArr, styles.fullWidth);

  return (
    <View style={[...styleArr, style]} {...viewProps}>
      {children}
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  fullSize: {
    height: '100%',
    width: '100%'
  },
  fullWidth: {
    width: '100%'
  }
});
