import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';

export type HandleDeviceTokenReq = {
  deviceToken: string;
};

export const SAVE_DEVICE_TOKEN_KEYS = {
  SAVE_DEVICE_TOKEN_REQ: 'SAVE_DEVICE_TOKEN_REQ',
  SAVE_DEVICE_TOKEN_SUCCESS: 'SAVE_DEVICE_TOKEN_SUCCESS',
  SAVE_DEVICE_TOKEN_FAILURE: 'SAVE_DEVICE_TOKEN_FAILURE'
};

export const saveDeviceToken = (data: HandleDeviceTokenReq) => (
  dispatch: Dispatch
): Promise<void> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/add-device-token',
    method: 'POST',
    types: Object.keys(SAVE_DEVICE_TOKEN_KEYS),
    body: {
      data
    }
  });

export const REMOVE_DEVICE_TOKEN_KEYS = {
  REMOVE_DEVICE_TOKEN_REQ: 'REMOVE_DEVICE_TOKEN_REQ',
  REMOVE_DEVICE_TOKEN_SUCCESS: 'REMOVE_DEVICE_TOKEN_SUCCESS',
  REMOVE_DEVICE_TOKEN_FAILURE: 'REMOVE_DEVICE_TOKEN_FAILURE'
};

export const removeDeviceToken = (data: HandleDeviceTokenReq) => (
  dispatch: Dispatch
): Promise<void> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/remove-device-token',
    method: 'POST',
    types: Object.keys(REMOVE_DEVICE_TOKEN_KEYS),
    body: {
      data
    }
  });
