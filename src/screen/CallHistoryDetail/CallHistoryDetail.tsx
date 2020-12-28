import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Text } from 'component/common';
import { Color } from 'theme/color';
import StackHeader from 'component/layout/Header/StackHeader';
import {
  CallHistoryDetailReq,
  getCallHistoryDetail,
  CallHistoryDetailRes,
  getImagesFromCallHistory,
  GetImagesReq,
  GetImagesRes
} from 'redux/action/call.action';
import moment from 'moment';
import { CallingHistoryState } from 'shared/constant';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/type';
import { convertSecondToTime } from 'shared/util/time';
import { SafeAreaView } from 'react-native-safe-area-context';
import LightBoxView from 'component/common/LightBox/LightBox';

interface Props {
  getCallHistoryDetail: (
    params: CallHistoryDetailReq
  ) => Promise<CallHistoryDetailRes>;
  getImagesFromCallHistory: (params: GetImagesReq) => Promise<GetImagesRes[]>;
}

const CallHistoryDetail: React.FC<Props> = (props: Props) => {
  const route = useRoute<RouteProp<RootStackParamList, 'CallHistoryDetail'>>();
  const { thucucCallId } = route.params;
  const [callDetail, setCallDetail] = useState<CallHistoryDetailRes | null>(
    null
  );
  const [listImages, setListImages] = useState<GetImagesRes[] | null>(null);

  useEffect(() => {
    const fetchCallDetail = async () => {
      const resultCallDetail = await props.getCallHistoryDetail({
        id: thucucCallId
      });
      const resultImages = await props.getImagesFromCallHistory({
        call_id: resultCallDetail.call_id
      });
      console.log('fetchCallDetail -> resultImages', resultImages);
      setListImages(resultImages);
      setCallDetail(resultCallDetail);
    };
    fetchCallDetail();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.green.dark }}>
      <StatusBar barStyle="dark-content" />
      {callDetail && (
        <Layout justify="flex-start" fullSize color="whiteDark">
          <StatusBar barStyle="light-content" />
          <StackHeader
            title="Chi tiết cuộc gọi"
            color="green"
            titleColor="white"
            iconColor="white"
            style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
          />
          <Layout fullWidth>
            <Layout
              style={[styles.infoCall, styles.addPaddingHor]}
              fullWidth
              color="green"
            >
              <Layout fullWidth align="flex-start">
                <Text
                  size={18}
                  color="white"
                  type="bold"
                  style={styles.addPaddingVer}
                >
                  Thông tin cuộc gọi
                </Text>
              </Layout>
              <Layout fullWidth direction="row" justify="space-between">
                <Layout
                  align="flex-start"
                  style={[styles.infoCol, styles.infoColLeft]}
                >
                  <Layout>
                    <Text color="white">NGÀY GIỜ GỌI</Text>
                  </Layout>
                  <Layout style={{ marginBottom: 12 }}>
                    <Text size={16} type="bold" color="white">
                      {moment(callDetail.created_at).format('DD/MM/YYYY')}
                    </Text>
                  </Layout>
                  <Layout>
                    <Text color="white">THỜI GIAN</Text>
                  </Layout>
                  <Layout>
                    <Text size={16} type="bold" color="white">
                      {convertSecondToTime(+callDetail.communicating_duration)}
                    </Text>
                  </Layout>
                </Layout>
                <Layout align="flex-start" style={styles.infoCol}>
                  <Layout>
                    <Text color="white">THỜI GIAN CHỜ</Text>
                  </Layout>
                  <Layout style={{ marginBottom: 12 }}>
                    <Text size={16} type="bold" color="white">
                      {convertSecondToTime(+callDetail.waiting_duration)}
                    </Text>
                  </Layout>
                  <Layout>
                    <Text color="white">TÌNH TRẠNG</Text>
                  </Layout>
                  <Layout>
                    <Text
                      size={16}
                      type="bold"
                      style={{
                        color: CallingHistoryState[callDetail.state].color
                      }}
                    >
                      {CallingHistoryState[callDetail.state].text}
                    </Text>
                  </Layout>
                </Layout>
              </Layout>
            </Layout>

            <Layout
              style={[styles.addMarginTop, styles.addPaddingHor]}
              fullWidth
              align="flex-start"
            >
              <Layout>
                <Text size={18} type="bold" style={styles.addPaddingVer}>
                  Hình ảnh
                </Text>
              </Layout>
              <Layout justify="flex-start" direction="row" fullWidth>
                {listImages &&
                  listImages.map((img) => (
                    <LightBoxView image_url={img.image_url}>
                      <Image
                        source={{ uri: img.image_url }}
                        style={styles.imageStyle}
                      />
                    </LightBoxView>
                  ))}
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = { getCallHistoryDetail, getImagesFromCallHistory };

export default connect(mapStateToProps, mapDispatchToProps)(CallHistoryDetail);

const styles = StyleSheet.create({
  addPaddingHor: {
    paddingHorizontal: 20
  },
  addPaddingVer: {
    marginVertical: 25
  },
  infoCall: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20
  },
  addMarginTop: {
    marginTop: 15
  },
  infoCol: {
    width: '50%',
    paddingLeft: 25
  },
  infoColLeft: {
    borderRightWidth: 0.5,
    borderColor: 'black'
  },
  imageStyle: {
    width: 85,
    height: 85,
    borderRadius: 2,
    marginRight: 8
  }
});
