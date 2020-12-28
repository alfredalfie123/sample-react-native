import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';

export function getImage() {
  return {
     type: 'GET_IMAGE'
  }
};

export function pushImage(data: any) {
  return {
    type: 'PUSH_IMAGE',
    payload: data
  }
};

export function clearData() {
  return {
    type: 'CLEAR_DATA'
  }
};

export function imageProcessClear() {
  return {
    type: 'UPLOAD_CLEAR'
  }
};

export function seenAllImage(){
  return {
    type: 'SEEN_ALL'
  }
};

export const UPLOAD_IMAGE = {
  UPLOAD_IMAGE_REQ: "UPLOAD_IMAGE_REQ",
  UPLOAD_IMAGE_SUCCESS: "UPLOAD_IMAGE_SUCCESS",
  UPLOAD_IMAGE_FAILURE: "UPLOAD_IMAGE_FAILURE",
};

export const uploadImage = (data: FormData) => (
  dispatch: Dispatch
): Promise<void> =>
  dispatchApi(dispatch, {
    endpoint: `/fe/op/call/send-image`,
    method: "post",
    types: Object.keys(UPLOAD_IMAGE),
    body: {
      data,
      onUploadProgress: (data) => {
        const action = {
          type: 'UPLOAD_PROCESSING',
          payload: data
        };
        dispatch(action);
      }
    }
  });
