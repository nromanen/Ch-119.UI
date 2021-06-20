export enum AuthActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  SET_USER_DATA = 'SET_USER_DATA',
  REGISTRATE_USER = 'REGISTRATE_USER',
  CHECK_USER_DATA = 'CHECK_USER_DATA',
  LOGOUT_USER = 'LOGOUT_USER',
  HANDLE_ERROR = 'HANDLE_ERROR',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}

export interface IAuthState {
  phone: string;
  password: string;
  refreshToken: string;
  accessToken: string;
  isAuth: boolean;
}

export interface IAuthAction {
  type: string;
  payload?: any;
}

export interface IUser {
  id: number;
  name?: string;
  phone: string;
  password: string;
  role: string[];
  tripsNum?: number;
  isAuth: boolean;
  hasError: boolean;
}
