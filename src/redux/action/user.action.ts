import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';
import { IUserResponse, INation, IUserUpdate } from 'model/user.model';
import { AsyncStorage } from 'react-native';
import { global } from 'shared/constant';

// TODO: <===================================== Register Action =====================================>
export const REGISTER_KEYS = {
  REGISTER_REQ: 'REGISTER_REQ',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE'
};

export type RegisterReq = {
  phone: string;
  name: string;
  password: string;
};

// export type InfoUserReq = {
//   email: string;
//   codeCell: string;
//   phone: string;
//   name: string;
//   gender: string;
//   address: string;
//   country: string;
//   district: string;
//   city: string;
// };

export type RegisterRes = {
  token: string;
  stringeeToken: string;
};

export const register = (info: RegisterReq) => (
  dispatch: Dispatch
): Promise<RegisterRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/reg',
    method: 'post',
    types: Object.keys(REGISTER_KEYS),
    body: {
      data: info
    }
  });

// TODO: <===================================== Login Action =====================================>
export const LOGIN_KEYS = {
  LOGIN_REQ: 'LOGIN_REQ',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE'
};

export type LoginReq = {
  phone: string;
  password: string;
};

export type LoginRes = {
  token: string;
  stringeeToken: string;
};

export const login = (info: LoginReq) => (
  dispatch: Dispatch
): Promise<LoginRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/login',
    method: 'post',
    types: Object.keys(LOGIN_KEYS),
    body: {
      data: info
    }
  });

// TODO: <===================================== PersistToken Action =====================================>
export const PERSIST_TOKEN_KEYS = {
  PERSIST_TOKEN: 'PERSIST_TOKEN'
};

export const persist = () => async (dispatch: Dispatch) => {
  const [authToken, stringeeToken] = await AsyncStorage.multiGet([
    global.authStoreKey,
    global.stringeeStoreKey
  ]);
  return dispatch({
    type: PERSIST_TOKEN_KEYS.PERSIST_TOKEN,
    payload: {
      authToken: authToken[1] || '',
      stringeeToken: stringeeToken[1] || ''
    }
  });
};
// TODO: <===================================== Logout Action =====================================>
export const LOGOUT_KEYS = {
  LOGOUT: 'LOGOUT'
};

export const logout = () => ({ type: LOGOUT_KEYS.LOGOUT });

// TODO: <===================================== Get user infoa Action =====================================>
export const GET_USER_INFO = {
  GET_USER_INFO_REQ: 'GET_USER_INFO_REQ',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAILURE: 'GET_USER_INFO_FAILURE'
};

export const getInfo = () => (dispatch: Dispatch): Promise<IUserResponse> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/profile',
    method: 'get',
    types: Object.keys(GET_USER_INFO),
    body: {}
  });

export const GET_NATION = {
  GET_NATION_REQ: 'GET_NATION_REQ',
  GET_NATION_SUCCESS: 'GET_NATION_SUCCESS',
  GET_NATION_FAILURE: 'GET_NATION_FAILURE'
};

export const getNation = () => (dispatch: Dispatch): Promise<INation[]> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/config/nations',
    method: 'get',
    types: Object.keys(GET_NATION),
    body: {}
  });

export const GET_CITY = {
  GET_CITY_REQ: 'GET_CITY_REQ',
  GET_CITY_SUCCESS: 'GET_CITY_SUCCESS',
  GET_CITY_FAILURE: 'GET_CITY_FAILURE'
};

export const getCity = (id: number) => (
  dispatch: Dispatch
): Promise<INation[]> =>
  dispatchApi(dispatch, {
    endpoint: `/fe/config/provinces?nation=` + id,
    method: 'get',
    types: Object.keys(GET_CITY),
    body: {}
  });

export const GET_DISTRICT = {
  GET_DISTRICT_REQ: 'GET_DISTRICT_REQ',
  GET_DISTRICT_SUCCESS: 'GET_DISTRICT_SUCCESS',
  GET_DISTRICT_FAILURE: 'GET_DISTRICT_FAILURE'
};

export const getDistrict = (id: number) => (
  dispatch: Dispatch
): Promise<INation[]> =>
  dispatchApi(dispatch, {
    endpoint: `/fe/config/districts?province=` + id,
    method: 'get',
    types: Object.keys(GET_DISTRICT),
    body: {}
  });

export const UPDATE_USER = {
  UPDATE_USER_REQ: 'UPDATE_USER_REQ',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE'
};

export const updateProfile = (data: IUserUpdate) => (
  dispatch: Dispatch
): Promise<void> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/update-profile',
    method: 'POST',
    types: Object.keys(UPDATE_USER),
    body: {
      data
    }
  });

// TODO: <===================================== Register Facebook Action =====================================>
export const REGISTER_FACEBOOK_KEYS = {
  REGISTER_FACEBOOK_REQ: 'REGISTER_FACEBOOK_REQ',
  REGISTER_FACEBOOK_SUCCESS: 'REGISTER_FACEBOOK_SUCCESS',
  REGISTER_FACEBOOK_FAILURE: 'REGISTER_FACEBOOK_FAILURE'
};

export type RegisterFacebookReq = {
  token?: string;
  phone: string;
  name: string;
  password: string;
};

export type RegisterFacebookRes = {
  token: string;
  stringeeToken: string;
};

export const registerWithFacebook = (info: RegisterFacebookReq) => (
  dispatch: Dispatch
): Promise<RegisterFacebookRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/register-fb',
    method: 'post',
    types: Object.keys(REGISTER_FACEBOOK_KEYS),
    body: {
      data: info
    }
  });

// TODO: <===================================== Login Facebook Action =====================================>
export const LOGIN_FACEBOOK_KEYS = {
  LOGIN_FACEBOOK_REQ: 'LOGIN_FACEBOOK_REQ',
  LOGIN_FACEBOOK_SUCCESS: 'LOGIN_FACEBOOK_SUCCESS',
  LOGIN_FACEBOOK_FAILURE: 'LOGIN_FACEBOOK_FAILURE'
};

export type LoginFbReq = {
  token: string;
};

export type LoginFbRes = {
  token: string;
  stringeeToken: string;
  id: string;
  name: string;
};

export const loginFb = (info: LoginFbReq) => (
  dispatch: Dispatch
): Promise<LoginFbRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/login-fb',
    method: 'post',
    types: Object.keys(LOGIN_FACEBOOK_KEYS),
    body: {
      data: info
    }
  });

// TODO: <===================================== Change Password Action =====================================>

export const CHANGE_PASSWORD_USER_KEYS = {
  CHANGE_PASSWORD_USER_REQ: 'CHANGE_PASSWORD_USER_REQ',
  CHANGE_PASSWORD_USER_SUCCESS: 'CHANGE_PASSWORD_USER_SUCCESS',
  CHANGE_PASSWORD_USER_FAILURE: 'CHANGE_PASSWORD_USER_FAILURE'
};

export type ChangePasswordReq = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordRes = {};

export const changePassword = (info: ChangePasswordReq) => (
  dispatch: Dispatch
): Promise<ChangePasswordRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/auth/change-password',
    method: 'post',
    types: Object.keys(CHANGE_PASSWORD_USER_KEYS),
    body: {
      data: info
    }
  });

// TODO: <===================================== RefreshToken =====================================>
export const REFRESH_TOKEN_KEYS = {
  REFRESH_TOKEN_REQ: 'REFRESH_TOKEN_REQ',
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',
  REFRESH_TOKEN_FAILURE: 'REFRESH_TOKEN_FAILURE'
};

export const refreshToken = () => (
  dispatch: Dispatch
): Promise<ChangePasswordRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/op/call/get-token',
    method: 'get',
    types: Object.keys(CHANGE_PASSWORD_USER_KEYS),
    body: {}
  });
