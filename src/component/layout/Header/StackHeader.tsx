import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Layout, Button, Icon, Text } from 'component/common';
import { useNavigation } from '@react-navigation/native';
import { IconColor, LayoutBackground, TextColor } from 'theme/color';

interface OwnsProps {
  goBack?: () => void;
  title: string;
  color?: keyof typeof LayoutBackground;
  titleColor?: keyof typeof TextColor;
  iconColor?: keyof typeof IconColor;
}

type Props = OwnsProps & ViewProps;

const StackHeader: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const defaultGoBack = () => navigation.goBack();
  const {
    goBack = defaultGoBack,
    title,
    color = 'transparent',
    titleColor = 'black',
    iconColor = 'black'
  } = props;

  return (
    <Layout
      direction="row"
      fullWidth
      style={[styles.headerWrapper, props.style]}
      color={color}
    >
      <Button
        onPress={() => goBack()}
        color="transparent"
        style={styles.iconWrapper}
      >
        <Icon
          color={iconColor}
          size={28}
          type="Ionicons"
          name="md-arrow-back"
        />
      </Button>
      <Text type="bold" color={titleColor} size={20}>
        {title}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    height: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  iconWrapper: {
    height: '100%',
    position: 'absolute',
    left: 16
  }
});

export default StackHeader;
