import { CALL_API } from "../middleware/api";
import { Action } from "redux";
import { Method, AxiosRequestConfig } from "axios";

interface ICallApiInfo {
  types: string[];
  endpoint: string;
  method: Method;
  body: AxiosRequestConfig;
  stop?: boolean;
}

export interface IApiAction extends Action {
  [CALL_API]: ICallApiInfo;
}

export default <T>(
  dispatch: any,
  { types, endpoint, method, body, stop }: ICallApiInfo
) =>
  dispatch({
    type: "",
    [CALL_API]: {
      types,
      endpoint,
      method,
      body,
      stop,
    },
  }) as Promise<T>;
