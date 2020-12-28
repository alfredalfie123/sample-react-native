export interface IUser {
  iat: string;
  name: string;
  idCallIdentity: string;
}
export interface IUserResponse {
  id: string,
  phone: string,
  name: string,
  dateOfBirth: Date | null,
  gender: number,
  address: string | null,
  idNation: string | null | number,
  idProvince: string | null | number,
  idDistrict: string | null | number,
  createdAt: Date | null | string | undefined,
  updatedAt: Date | null | string | undefined
}
export interface INation {
  id: number,
  code: string,
  name: string,
  createdAt: Date | null | string,
  updatedAt: Date | null | string
}
export interface ICity {
  id: number,
  idNation: string | number,
  name: string,
  createdAt: Date | null | string,
  updatedAt: Date | null | string
}
export interface IDistict {
  id: number | string,
  idProvince: string | number,
  name: string,
  createdAt: Date | null | string,
  updatedAt: Date | null | string
}
export interface IUserUpdate {
  gender: number,
  address: string | null,
  idNation: string | null | number,
  idProvince: string | null | number,
  idDistrict: string | null | number
}