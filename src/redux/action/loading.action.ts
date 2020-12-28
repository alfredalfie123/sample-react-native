import { Dispatch } from 'redux';

export enum LoadingKeys {
  SET_LOADING = 'SET_LOADING',
  REMOVE_LOADING = 'REMOVE_LOADING',
}
export const setLoading = () => (dispatch: Dispatch) =>
  dispatch({
    type: LoadingKeys.SET_LOADING,
  });

export const removeLoading = () => (dispatch: Dispatch) =>
  dispatch({
    type: LoadingKeys.REMOVE_LOADING,
  });
