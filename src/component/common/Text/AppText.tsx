import React from 'react';
import { TextStyle, Text, TextProps } from 'react-native';
import { TextColor } from 'theme/color';

type TextType = 'bold' | 'italic' | 'normal';

interface Props extends TextProps {
  type?: TextType;
  subtitle?: boolean;
  color?: keyof typeof TextColor;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  size?: number;
}

const FontDics: { [k in TextType]: string } = {
  bold: 'NotoSansBold',
  italic: 'NotoSansItalic',
  normal: 'NotoSans',
};

const AppText: React.FC<Props> = (props) => {
  const {
    style,
    type = 'normal',
    children,
    subtitle,
    size = 14,
    color = 'black',
    align = 'auto',
    ...other
  } = props;
  const fontStyle: TextStyle = {
    fontFamily: FontDics[type],
    color: TextColor[color],
    textAlign: align,
    fontSize: size,
  };

  return (
    <Text style={[fontStyle, style]} {...other}>
      {children}
    </Text>
  );
};

export default AppText;
