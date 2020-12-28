import { AnyAction } from 'redux';

export default function callReducer(
  state: Boolean = false,
  action: AnyAction
) {
  switch (action.type) {
    case 'SET_DELAY':
      return true;
    case 'CLEAR_DELAY':
      return false;
    default:
      return state;
  }
}
