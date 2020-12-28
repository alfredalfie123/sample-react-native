import { ErrorKeys } from 'action/error.action';
import { AnyAction } from 'redux';

export interface IErrorState {
  error: null | { messages: string[] };
}

const initial = {
  error: null,
};

export default function errorReducer (
  state: IErrorState = initial,
  action: AnyAction
): IErrorState {
  switch (action.type) {
    case ErrorKeys.SET_ERROR: {
      console.log(action.payload);
      
      return { error: action.payload };
    }
    case ErrorKeys.CLEAR_ERROR: {
      return { error: null };
    }
    default:
      return state;
  }
}
