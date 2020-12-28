import { ClientCallback } from './client.type';

export type SignalChangeInfo = {
  callId: string;
  code: number;
  reason: string;
  sipCode: number;
  sipReason: string;
};

export type MediaStateInfo = {
  callId: string;
  code: number;
  description: string;
};

export type OnAnotherDeviceInfo = {
  callId: string;
  code: number;
  description: string;
};

export type ReceiveCallInfo = { callId: string; data: string };

export type StreamHandler = (info: { callId: string }) => void;

type CallHandler = (callId: string, callback: ClientCallback) => void;
type MakeCallCb = (
  status: boolean,
  code: number,
  message: string,
  callId: string,
  customDataFromYourServer: any
) => void;

export interface StringeeCallRef {
  initAnswer: CallHandler;
  answer: CallHandler;
  hangup: CallHandler;
  reject: CallHandler;
  makeCall: (parameters: string, callback: MakeCallCb) => void;
  enableVideo: (
    callId: string,
    enabled: boolean,
    callback: ClientCallback
  ) => void;
  mute: (callId: string, mute: boolean, callback: ClientCallback) => void;
  setSpeakerphoneOn: (
    callId: string,
    on: boolean,
    callback: ClientCallback
  ) => void;
  resumeVideo: (callId: string, callback: ClientCallback) => void;
}
