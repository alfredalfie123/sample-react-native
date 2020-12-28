import React from 'react';
import { Text } from 'component';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';

export interface BannerProps {
  title: string;
  subtitle: string;
  imageUrl: ImageSourcePropType;
}

const Banner: React.FC<BannerProps> = (props) => {
  const { title, imageUrl, subtitle } = props;
  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Image source={imageUrl} style={styles.banner} />
        <View style={styles.textWrapper}>
          <Text style={styles.text} type='bold'>
            {title}
          </Text>
          <Text style={styles.text}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 250,
    height: 100,
    backgroundColor: '#378F66',
    borderRadius: 8,
    marginRight: 8
  },
  wrapper: {
    width: 235,
    height: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
  },
  banner: {
    width: 235,
    height: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    opacity: 0.4
  },
  textWrapper: {
    backgroundColor: 'transparent',
    height: 70,
    justifyContent: 'space-between',
    width: 220,
    marginLeft: 15,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});

export default React.memo(Banner);
