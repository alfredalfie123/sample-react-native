import jwtDecode from 'jwt-decode';
import { IUser } from 'model/user.model';
import * as userAction from 'action/user.action';
import moment from 'moment';

export interface IUserState {
  authToken: string;
  stringeeToken: string;
  isLoggedIn: boolean;
  user?: IUser;
  loadedInfo: boolean;
  loginFb?: boolean;
  expired: boolean;
}

const initialState: IUserState = {
  authToken: '',
  stringeeToken: '',
  isLoggedIn: false,
  loadedInfo: false,
  loginFb: false,
  expired: false
};

export default function userReducer(
  state: IUserState = initialState,
  action: any
): IUserState {
  switch (action.type) {
    case userAction.REGISTER_FACEBOOK_KEYS.REGISTER_FACEBOOK_SUCCESS: {
      if (action.payload.token) {
        const {
          token,
          stringeeToken
        } = action.payload as userAction.RegisterRes;
        const user = jwtDecode(token) as IUser;
        return {
          ...state,
          isLoggedIn: true,
          authToken: token,
          loginFb: true,
          stringeeToken,
          user
        };
      }
    }
    case userAction.REGISTER_KEYS.REGISTER_SUCCESS: {
      const { token, stringeeToken } = action.payload as userAction.RegisterRes;
      const user = jwtDecode(token) as IUser;
      return {
        ...state,
        isLoggedIn: true,
        authToken: token,
        stringeeToken,
        user
      };
    }
    case userAction.LOGIN_FACEBOOK_KEYS.LOGIN_FACEBOOK_SUCCESS: {
      if (action.payload.token) {
        const { token, stringeeToken } = action.payload;
        const user = jwtDecode(token) as IUser;
        return {
          ...state,
          isLoggedIn: true,
          authToken: token,
          stringeeToken,
          loginFb: true,
          user
        };
      }

      return {
        ...state
      };
    }
    case userAction.LOGIN_KEYS.LOGIN_SUCCESS: {
      const { token, stringeeToken } = action.payload;
      const user = jwtDecode(token) as IUser;

      return {
        ...state,
        isLoggedIn: true,
        authToken: token,
        stringeeToken,
        user
      };
    }
    case userAction.PERSIST_TOKEN_KEYS.PERSIST_TOKEN: {
      const { authToken, stringeeToken } = action.payload;
      console.log(action.payload);
      if (authToken.length && stringeeToken.length) {
        const user = jwtDecode(authToken) as IUser;
        const { exp } = jwtDecode(stringeeToken);

        if (moment(new Date(exp * 1000)).isBefore(new Date())) {
          return {
            ...initialState,
            loadedInfo: true,
            isLoggedIn: false,
            expired: true
          };
        }

        return {
          loadedInfo: true,
          isLoggedIn: true,
          authToken,
          stringeeToken,
          user,
          expired: false
        };
      } else {
        return {
          ...initialState,
          isLoggedIn: false,
          loadedInfo: true
        };
      }
    }
    case userAction.LOGOUT_KEYS.LOGOUT: {
      return {
        ...initialState,
        loadedInfo: true,
        isLoggedIn: false
      };
    }
    default:
      return state;
  }
}
