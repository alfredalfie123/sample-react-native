import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Layout, Text, Icon, Button, Avatar } from 'component/common';
import { Color } from 'theme/color';
import Banner, { BannerProps } from './Banner';
import { banners } from './bannerData';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StoreState } from 'redux/store';
import { IUserState } from 'redux/reducer/user.reducer';

interface Props {
  logoutHandler: () => Promise<void>;
}

const HomeHeader: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const user = useSelector<StoreState, IUserState>((state) => state.user);

  const readableVersion = DeviceInfo.getReadableVersion();

  return (
    <Layout fullWidth justify="flex-start" style={styles.headerWrapper}>
      <Layout
        fullWidth
        justify="flex-start"
        color="green"
        style={styles.header}
      >
        <Layout direction="row">
          <Layout
            direction="row"
            color="green"
            justify="flex-start"
            style={styles.avatarNameWrapper}
          >
            <Avatar
              circle
              size="sm"
              image={require('resource/images/user.jpg')}
            />
            <Text
              color="white"
              type="bold"
              size={16}
              style={{ width: 175, marginLeft: 12 }}
            >
              {user.user!.name}
            </Text>
          </Layout>
          <Layout direction="row">
            <Button
              onPress={() => navigation.navigate('UserInformation')}
              color="white"
              style={[styles.iconButton]}
            >
              <Icon
                type="Ionicons"
                name="ios-settings"
                color="grayLight"
                size={22}
              />
            </Button>
            <Button
              onPress={() => navigation.navigate('Notification')}
              color="white"
              style={[styles.iconButton]}
            >
              <Icon
                type="Ionicons"
                name="ios-notifications"
                color="grayLight"
                size={22}
              />
            </Button>
            {/* <Button
              onPress={() => navigation.navigate('PasswordChange')}
              color="white"
              style={[styles.iconButton]}
            >
              <Icon
                type="MaterialIcons"
                name="security"
                color="grayLight"
                size={22}
              />
            </Button> */}
            <Button
              onPress={props.logoutHandler}
              color="white"
              style={[styles.iconButton, { marginRight: 0 }]}
            >
              <Icon
                type="Ionicons"
                name="md-exit"
                color="grayLight"
                size={24}
              />
            </Button>
          </Layout>
        </Layout>
        <Layout fullWidth>
          <Text color="white">
            Bạn cần trợ giúp? Liên lạc hotline{' '}
            <Text color="white" type="bold">
              1900 1920!
            </Text>
          </Text>
        </Layout>
        <Layout fullWidth>
          <Text color="white">
            Thông tin phiên bản{' '}
            <Text color="white" type="bold">
              {readableVersion}
            </Text>
          </Text>
        </Layout>
      </Layout>
      <Layout style={styles.bannerWrapper}>
        <FlatList
          data={banners}
          renderItem={({ item }) => <Banner {...item} />}
          horizontal
          keyExtractor={(item: BannerProps, index) => `${item.title}_${index}`}
          style={{ backgroundColor: 'transparent' }}
          showsHorizontalScrollIndicator={false}
        />
      </Layout>
    </Layout>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    height: 225
  },
  header: {
    paddingHorizontal: 18,
    height: 175,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  bannerWrapper: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    right: 0,
    zIndex: 1000
  },
  avatarNameWrapper: {
    marginBottom: 12,
    marginTop: 10
  },
  avatar: {
    marginRight: 10,
    borderColor: Color.white.light,
    borderWidth: 2
  },
  userName: {
    width: 175,
    fontSize: 16
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 5,
    marginRight: 10
  }
});
