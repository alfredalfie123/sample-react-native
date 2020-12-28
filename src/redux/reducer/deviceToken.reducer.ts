import { AnyAction } from 'redux';
import {
  SAVE_DEVICE_TOKEN_KEYS,
  REMOVE_DEVICE_TOKEN_KEYS
} from 'action/deviceToken.action';

export interface IDeviceTokenState {
  saved: boolean;
}

const initial: IDeviceTokenState = {
  saved: false
};

export default function deviceTokenReducer(
  state: IDeviceTokenState = initial,
  action: AnyAction
): IDeviceTokenState {
  switch (action.type) {
    case SAVE_DEVICE_TOKEN_KEYS.SAVE_DEVICE_TOKEN_SUCCESS:
      console.log('[SAVE_DEVICE_TOKEN_SUCCESS]');
      return { saved: true };
    case REMOVE_DEVICE_TOKEN_KEYS.REMOVE_DEVICE_TOKEN_SUCCESS:
      console.log('[REMOVE_DEVICE_TOKEN_SUCCESS]');
      return { saved: false };
    default:
      return state;
  }
}
