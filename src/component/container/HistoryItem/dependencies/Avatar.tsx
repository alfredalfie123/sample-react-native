import React from 'react';
import { CallingType, ItemHeight } from 'shared/constant';
import { Layout } from '@ui-kitten/components';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  image: ImageSourcePropType;
  type: keyof typeof CallingType;
}

const Avatar: React.FC<Props> = ({ image, type }) => (
  <Layout>
    <Image style={styles.avatar} source={image} />
    <Layout style={styles.iconWrapper}>
      <Icon
        style={type === 'voice' ? { transform: [{ rotate: '-90deg' }] } : {}}
        size={type === 'video' ? 14 : 18}
        name={CallingType[type].icon}
        color='white'
      />
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  avatar: {
    height: Math.round(0.7 * ItemHeight),
    width: Math.round(0.7 * ItemHeight),
    borderRadius: 8,
  },
  iconWrapper: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#359D5E',
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    right: -5,
    bottom: -5,
  },
});

export default Avatar;
