import { AuthActionTypes, IAuthAction } from '../types/userTypes';

export const registrate = (payload: any): IAuthAction => ({
  type: AuthActionTypes.REGISTRATE_USER,
  payload,
});

export const registrateDriver = (payload: any): IAuthAction => ({
  type: AuthActionTypes.REGISTRATE_DRIVER,
  payload,
});

export const setUserData = (payload: any): IAuthAction => ({
  type: AuthActionTypes.SET_USER_DATA,
  payload,
});

export const setDriverData = (payload: any): IAuthAction => ({
  type: AuthActionTypes.SET_DRIVER_DATA,
  payload,
});

export const checkDriver = (payload: any) => ({
  type: AuthActionTypes.IS_DRIVER,
  payload,
});

export const login = (payload: any): IAuthAction => ({
  type: AuthActionTypes.LOGIN_USER,
  payload,
});

export const check = (): IAuthAction => ({
  type: AuthActionTypes.CHECK_USER_DATA,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT_USER,
});

export const errorHandle = (payload: any): IAuthAction => ({
  type: AuthActionTypes.HANDLE_ERROR,
  payload,
});
