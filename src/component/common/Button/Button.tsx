import React from 'react';
import {
  TouchableHighlight,
  TouchableHighlightProps,
  ViewStyle,
} from 'react-native';
import { ButtonBackground, ButtonUnderlayColor, Color } from 'theme/color';
import Layout from '../Layout/Layout';
import { pushStyle } from 'shared/util/util';

interface Props extends TouchableHighlightProps {
  color?: keyof typeof ButtonBackground;
  children?: React.ReactElement;
  variant?: 'rounded' | 'circle' | 'normal';
  width?: number;
  height?: number;
  size?: number;
  bordered?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<Props> = (props: Props) => {
  const {
    children,
    style,
    variant = 'normal',
    fullWidth = false,
    height = 50,
    size = 50,
    bordered = false,
    ...buttonProps
  } = props;
  const color = props.color || 'green';
  const onPress = props.onPress || function () {};
  let ownStyles: ViewStyle[] = [
    {
      backgroundColor: ButtonBackground[color],
      height
    }
  ];

  ownStyles = pushStyle(variant === 'circle', ownStyles, {
    borderRadius: 1000,
    height: size,
    width: size
  });
  ownStyles = pushStyle(variant === 'rounded', ownStyles, {
    borderRadius: 1000
  });
  ownStyles = pushStyle(fullWidth, ownStyles, { width: '100%' });
  ownStyles = pushStyle(bordered, ownStyles, {
    borderColor: Color.gray.light,
    borderWidth: 1
  });

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={ButtonUnderlayColor[color]}
      style={[...ownStyles, style]}
      {...buttonProps}
    >
      <Layout fullSize>{children}</Layout>
    </TouchableHighlight>
  );
};

export default Button;
