import VIForegroundService from '@voximplant/react-native-foreground-service';
import dispatchApi from './dispatchApi';
import { Dispatch, Action } from 'redux';
import { CallingStatus } from 'shared/constant';
import { Platform } from 'react-native';

export const GET_CALL_HISTORY_KEYS = {
  GET_CALL_HISTORY_REQ: 'GET_CALL_HISTORY_REQ',
  GET_CALL_HISTORY_SUCCESS: 'GET_CALL_HISTORY_SUCCESS',
  GET_CALL_HISTORY_FAILURE: 'GET_CALL_HISTORY_FAILURE'
};

export type ListCallHistoriesReq = {
  page: number;
  size?: number;
};

export type ICallHistoryInfo = {
  from_name: string;
  to_name: string;
  id: string;
  call_id: string;
  initialized_at: Date;
  type: keyof typeof CallingStatus;
};

export type ListCallHistoriesRes = Array<ICallHistoryInfo> | number;

export const getListCallHistory = (params: ListCallHistoriesReq) => (
  dispatch: Dispatch
): Promise<ListCallHistoriesRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/op/call/history',
    method: 'GET',
    types: Object.keys(GET_CALL_HISTORY_KEYS),
    body: {
      params
    }
  });

export const GET_CALL_HISTORY_DETAIL_KEYS = {
  GET_CALL_HISTORY_DETAIL_REQ: 'GET_CALL_HISTORY_DETAIL_REQ',
  GET_CALL_HISTORY_DETAIL_SUCCESS: 'GET_CALL_HISTORY_DETAIL_SUCCESS',
  GET_CALL_HISTORY_DETAIL_FAILURE: 'GET_CALL_HISTORY_DETAIL_FAILURE'
};

export type CallHistoryDetailReq = {
  id: string;
};

export interface CallHistoryDetailRes extends ICallHistoryInfo {
  from_type: string;
  to_type: string;
  created_at: Date;
  updated_at: Date;
  id: string;
  from_number: string;
  to_number: string;
  state: string;
  routed_at: any;
  started_at: Date;
  ended_at: Date;
  ended_by: any;
  waiting_duration: Date;
  communicating_duration: Date;
  total_duration: Date;
}

export const getCallHistoryDetail = (params: CallHistoryDetailReq) => (
  dispatch: Dispatch
): Promise<CallHistoryDetailRes> =>
  dispatchApi(dispatch, {
    endpoint: 'fe/op/call/history-detail',
    method: 'GET',
    types: Object.keys(GET_CALL_HISTORY_DETAIL_KEYS),
    body: {
      params
    }
  });

// TODO: <===================================== Response Incomming Action =====================================>
export const ResponseIncommingKeys = {
  WAIT: 'WAIT',
  PICKUP: 'PICKUP',
  HANGUP: 'HANGUP',
  CLEAR: 'CLEAR'
};

export function incomingWait(callId: string) {
  console.log('Dispatch incoming wait', callId);
  return { type: ResponseIncommingKeys.WAIT, payload: { callId } };
}

export function pickUpPhone(): Action {
  console.log('Dispatch pickup phone');
  if (Platform.OS === 'android') {
    const notificationConfig = {
      channelId: 'thucucbeauty',
      id: 3456,
      title: 'Thu Cuc Beauty',
      text: 'Cuộc gọi đang diễn ra',
      icon: 'ic_icon'
    };
    VIForegroundService.startService(notificationConfig).catch((err: Error) =>
      console.log(`Start foreground service failed`, err)
    );
  }
  return { type: ResponseIncommingKeys.PICKUP };
}

export function hangUpPhone(): Action {
  console.log('Dispatch hangup phone');
  if (Platform.OS === 'android') {
    VIForegroundService.stopService().catch((err: Error) =>
      console.log(`Stop foreground service failed`, err)
    );
  }
  return { type: ResponseIncommingKeys.HANGUP };
}

export function clearIncommingResponse(): Action {
  return { type: ResponseIncommingKeys.CLEAR };
}

// TODO: <===================================== Get Images CallHistory Action =====================================>

export const GET_IMAGES_CALL_HISTORY_KEYS = {
  GET_IMAGES_CALL_HISTORY_REQ: 'GET_IMAGES_CALL_HISTORY_REQ',
  GET_IMAGES_CALL_HISTORY_SUCCESS: 'GET_IMAGES_CALL_HISTORY_SUCCESS',
  GET_IMAGES_CALL_HISTORY_FAILURE: 'GET_IMAGES_CALL_HISTORY_FAILURE'
};

export type GetImagesReq = {
  call_id: string;
};

export interface GetImagesRes {
  created_at: Date;
  updated_at: Date;
  id: string;
  callID: string;
  image_url: string;
  created_by_call_identity: string;
  name: string;
}

export const getImagesFromCallHistory = (params: GetImagesReq) => (
  dispatch: Dispatch
): Promise<GetImagesRes[]> =>
  dispatchApi(dispatch, {
    endpoint: `/fe/op/call/chat-images`,
    method: 'GET',
    types: Object.keys(GET_IMAGES_CALL_HISTORY_KEYS),
    body: {
      params
    }
  });

// TODO: <===================================== Set callId =====================================>
export const SetCallIdKeys = 'SetCallIdKeys';
export const setCallIdAction = (callId: string) => ({
  type: SetCallIdKeys,
  payload: { callId }
});
