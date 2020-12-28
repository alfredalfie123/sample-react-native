import { AnyAction } from 'redux';
import { ResponseIncommingKeys, SetCallIdKeys } from 'redux/action/call.action';

export interface ICallState {
  responseIncomming: string | null;
  callId: string;
}

const initial: ICallState = {
  responseIncomming: null,
  callId: ''
};

export default function callReducer(
  state: ICallState = initial,
  action: AnyAction
): ICallState {
  switch (action.type) {
    case ResponseIncommingKeys.PICKUP: {
      return { ...state, responseIncomming: ResponseIncommingKeys.PICKUP };
    }
    case ResponseIncommingKeys.WAIT: {
      return { ...state, responseIncomming: ResponseIncommingKeys.WAIT };
    }
    case ResponseIncommingKeys.HANGUP: {
      return { ...state, responseIncomming: ResponseIncommingKeys.HANGUP };
    }
    case ResponseIncommingKeys.CLEAR: {
      return {
        ...state,
        responseIncomming: null
      };
    }
    case SetCallIdKeys: {
      console.log('======== SETCALLID', action.payload.callId);

      return {
        ...state,
        callId: action.payload.callId
      };
    }
    default:
      return state;
  }
}
