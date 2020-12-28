import { AnyAction } from 'redux';


export default function callReducer(
  state = false,
  action: AnyAction
) {
  switch (action.type) {
    case 'UPLOAD_PROCESSING': {
      return action.payload;
    }
    case 'UPLOAD_CLEAR': {
      return {};
    }
    default:
      return state;
  }
}
