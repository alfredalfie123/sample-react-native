export type ClientConnectionInfo = {
  userId: string;
  projectId: string;
  isReconnecting: boolean;
};

export type ClientErrorListener = (arg: {
  userId: string;
  code: number;
  message: string;
}) => void;

export type IncomingCallInfo = {
  userId: string;
  callId: string;
  from: string;
  to: string;
  fromAlias: string;
  toAlias: string;
  callType: number;
  isVideoCall: boolean;
  customDataFromYourServer: string;
};
export type IncomingCallListener = (arg: IncomingCallInfo) => void;

export type ClientConnect = (token: string) => void;
export type ClientDisConnect = () => void;

export type ClientCallback = (
  status: boolean,
  code: number,
  message: string
) => void;

export type RegisterPush = (
  deviceToken: string,
  isProduction: boolean,
  isVoip: boolean,
  callback: ClientCallback
) => void;

export type UnregisterPush = (
  deviceToken: string,
  callback: ClientCallback
) => void;
