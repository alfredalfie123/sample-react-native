import { LoginFbRes } from 'redux/action/user.action';

export type RootStackParamList = {
  CallHistoryDetail: {
    thucucCallId: string;
  };
  RegisterWithFacebook: {
    accessTokenFB: {
      accessToken: string;
    };
    infoFB?: LoginFbRes;
  };
};
