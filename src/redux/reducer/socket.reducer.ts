import { AnyAction } from 'redux';


export default function callReducer(
  state = false,
  action: AnyAction
) {
  switch (action.type) {
    case 'CONNECT': {
      state = true;
      return state;
    }
    case 'DISCONNECT': {
      state = false
      return state;
    }
    default:
      return state;
  }
}
