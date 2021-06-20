import { AuthActionTypes, IAuthAction, IUser } from '../types/userTypes';

export const initialState: IUser = {
  name: '',
  phone: '',
  password: '',
  role: [],
  isAuth: false,
  hasError: false,
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
        id: action.payload.id,
      };
    case AuthActionTypes.SET_DRIVER_DATA:
      return {
        ...state,
        name: action.payload.name,
        role: [action.payload.roles[0], action.payload.roles[1]],
        isAuth: true,
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
        hasError: true,
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
      };
    case AuthActionTypes.REGISTRATE_DRIVER:
      console.log('PAYLOAD IN REDUCER', action.payload);
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
        isDriver: true,
      };
    case AuthActionTypes.IS_DRIVER:
      return {
        ...state,
        isDriver: action.payload.isDriver,
      };
    default:
      return state;
  }
};

export const registrate = (payload: any): IAuthAction => ({
  type: AuthActionTypes.REGISTRATE_USER,
  payload,
});

export const registrateDriver = (payload: any): IAuthAction => ({
  type: AuthActionTypes.REGISTRATE_DRIVER,
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

const setAuthUserData = (payload: any): IAuthAction => ({
  type: AuthActionTypes.SET_USER_DATA,
  payload,
});

export const getAuthUserData = () => async (dispatch: any) => {
  const response: any = await check();

  if (response.data.resultCode === 0) {
    const { ...payload } = response.data.data;
    dispatch(setAuthUserData({ ...payload }));
  }
};

export const check = (): IAuthAction => ({
  type: AuthActionTypes.CHECK_USER_DATA,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT_USER,
});

// export const login = (email, password, remeberMe) => async (dispatch) => {
//   let response = await authAPI.login(email, password, remeberMe);
//   if (response.data.resultCode === 0) {
//     dispatch(getAuthUserData());
//   } else {
//     let message =
//       response.data.messages.length > 0
//         ? response.data.messages[0]
//         : 'Some error';
//     dispatch(stopSubmit('login', { _error: message }));
//   }
// };
