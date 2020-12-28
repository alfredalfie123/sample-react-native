import React from 'react';
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ViewProps
} from 'react-native';
import Layout from '../Layout/Layout';
import { pushStyle } from 'shared/util/util';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface Props extends ViewProps {
  size?: AvatarSize;
  circle?: boolean;
  image: ImageSourcePropType;
}

const sizeValue = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12
};

const Avatar: React.FC<Props> = (props: Props) => {
  const { size = 'md', circle = false, style, image, ...avatarProps } = props;

  let commonStyle: ViewStyle[] = [
    styles.wrapper,
    {
      width: 8 * sizeValue[size],
      height: 8 * sizeValue[size]
    }
  ];
  // TODO: Push more styles
  commonStyle = pushStyle(circle, commonStyle, styles.circle);
  return (
    <Layout style={[...commonStyle, style]} {...avatarProps}>
      <Image
        source={image}
        style={[styles.imageStyle, circle && styles.circle]}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: 'white',
    borderWidth: 2
  },
  imageStyle: {
    width: '100%',
    height: '100%'
  },
  circle: {
    borderRadius: 1000
  }
});

export default Avatar;
