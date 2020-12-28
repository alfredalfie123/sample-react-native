import { LoadingKeys } from 'action/loading.action';
import { Action } from 'redux';

export interface ILoadingState {
  isLoading: boolean;
}

const initial = {
  isLoading: false,
};

export default function loadingReducer (
  state: ILoadingState = initial,
  action: Action
): ILoadingState {
  switch (action.type) {
    case LoadingKeys.SET_LOADING:
      return { isLoading: true };
    case LoadingKeys.REMOVE_LOADING:
      return { isLoading: false };
    default:
      return state;
  }
}
