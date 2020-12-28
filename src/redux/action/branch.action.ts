import dispatchApi from './dispatchApi';
import { Dispatch } from 'redux';

export const GET_BRANCHES_KEYS = {
  GET_BRANCHES_REQ: 'GET_BRANCHES_REQ',
  GET_BRANCHES_SUCCESS: 'GET_BRANCHES_SUCCESS',
  GET_BRANCHES_FAILURE: 'GET_BRANCHES_FAILURE'
};

export type IBranches = {
  createAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  address: string;
  idProvince: number;
  province: string;
};

export type ListBranchesRes = IBranches[];

export const getListBranches = () => (
  dispatch: Dispatch
): Promise<ListBranchesRes> =>
  dispatchApi(dispatch, {
    endpoint: '/fe/config/branches',
    method: 'GET',
    types: Object.keys(GET_BRANCHES_KEYS),
    body:{}
  });
