export enum AuthActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  SET_USER_DATA = 'SET_USER_DATA',
  REGISTRATE_USER = 'REGISTRATE_USER',
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
  name?: string;
  phone: string;
  password: string;
  role: string[];
  tripsNum?: number;
  isAuth: boolean;
}
