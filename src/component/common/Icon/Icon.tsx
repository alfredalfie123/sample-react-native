import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { IconColor } from 'theme/color';

const IconDicts = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
};

export type IconType = keyof typeof IconDicts;

export interface CustomIconProps extends IconProps {
  type: IconType;
  color?: keyof typeof IconColor;
}

const Icon: React.FC<CustomIconProps> = (props: CustomIconProps) => {
  const { type, color, ...other } = props;
  const IconSelected = IconDicts[type];
  return <IconSelected color={IconColor[color || 'white']} {...other} />;
};

export default Icon;
