export enum ErrorKeys {
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR'
}
export const setError = (messages: string[]) => ({
  type: ErrorKeys.SET_ERROR,
  payload: { messages }
});

export const clearError = () => ({
  type: ErrorKeys.CLEAR_ERROR
});
