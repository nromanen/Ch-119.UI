import { AuthActionTypes, IUser } from '../types/userTypes';

export const initialState: IUser = {
  name: '',
  phone: '',
  password: '',
  role: [],
  isAuth: false,
  hasError: false,
  authError: '',
  id: null,
  isDriver: false,
  driver_info: {
    car_color: '',
    car_model: '',
    car_number: '',
    driver_id: null,
  },
};

export const authReducer = (state = initialState, action: any): IUser => {
  switch (action.type) {
    case AuthActionTypes.SET_USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.roles,
        isAuth: true,
        hasError: false,
        id: action.payload.id,
      };
    case AuthActionTypes.SET_DRIVER_DATA:
      return {
        ...state,
        name: action.payload.name,
        role: [action.payload.roles[0], action.payload.roles[1]],
        isAuth: true,
        hasError: false,
        id: action.payload.id,
        driver_info: {
          car_color: action.payload.driver_info.car_color,
          car_model: action.payload.driver_info.car_model,
          car_number: action.payload.driver_info.car_number,
          driver_id: action.payload.driver_info.driver_id,
        },
      };
    case AuthActionTypes.LOGIN_USER:
      return {
        ...state,
        phone: action.payload.phone,
        password: action.payload.password,
      };
    case AuthActionTypes.REGISTRATE_USER:
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
        password: action.payload.password,
      };
    case AuthActionTypes.CHECK_USER_DATA:
      return {
        ...state,
      };
    case AuthActionTypes.HANDLE_ERROR:
      return {
        ...state,
        authError: action.payload.data,
        hasError: action.payload.hasError,
      };
    case AuthActionTypes.LOGOUT_USER:
      return {
        ...state,
        name: '',
        phone: '',
        password: '',
        role: [],
        isAuth: false,
        id: 0,
        driver_info: {
          car_color: '',
          car_model: '',
          car_number: '',
          driver_id: null,
        },
        isDriver: false,
      };
    case AuthActionTypes.REGISTRATE_DRIVER:
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
        password: action.payload.password,
        driver_info: {
          car_color: action.payload.car_color,
          car_model: action.payload.car_model,
          car_number: action.payload.car_number,
        },
      };
    case AuthActionTypes.IS_DRIVER:
      return {
        ...state,
        isDriver: action.payload,
      };
    default:
      return state;
  }
};

