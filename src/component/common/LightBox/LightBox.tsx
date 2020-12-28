import React from 'react';
import { Image, View } from 'react-native';
import Lightbox from 'react-native-lightbox';

interface Props {
  image_url: string;
  children: any;
}

const LightBoxView: React.FC<Props> = (props, { navigator }) => {
  const renderLight = (image_url: string) => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <Image
        style={{ flex: 10 }}
        resizeMode="contain"
        source={{
          uri: image_url
        }}
      />
    </View>
  );
  return (
    <Lightbox
      navigator={navigator}
      renderContent={() => renderLight(props.image_url)}
    >
      {props.children}
    </Lightbox>
  );
};

export default LightBoxView;
