export enum AuthActionTypes {
  LOGIN_USER = 'LOGIN_USER',
  SET_USER_DATA = 'SET_USER_DATA',
  REGISTRATE_USER = 'REGISTRATE_USER',
  CHECK_USER_DATA = 'CHECK_USER_DATA',
  LOGOUT_USER = 'LOGOUT_USER',
  HANDLE_ERROR = 'HANDLE_ERROR',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  REGISTRATE_DRIVER = 'REGISTRATE_DRIVER',
  SET_DRIVER_DATA = 'SET_DRIVER_DATA',
  IS_DRIVER = 'IS_DRIVER',
  VERIFY_USER = 'VERIFY_USER',
}

export interface InputGeneralI {
  className?: string;
  type?: string;
  name: string;
  placeholder?: string;
  validate: any;
  required?: any;
  label: string;
  id?: string;
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
  hasError: boolean;
  id: number | null;
  driver_info?: IDriver,
  isDriver: boolean,
  authError: string,
  verification_code?: number;
}

export interface IDriver {
  car_color: string;
  car_model: string;
  car_number: string;
  driver_id?: number | null;
}
