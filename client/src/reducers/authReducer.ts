import {
  AuthActionTypes,
  IAuthAction,
  IUser,
} from '../types/userTypes';
import { check } from '../http/userApi';

export const initialState: IUser = {
  name: '',
  phone: '',
  password: '',
  role: [],
  isAuth: false,
};

export const authReducer = (state = initialState, action: any): IUser => {
  switch (action.type) {
    case AuthActionTypes.SET_USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.roles,
      };
    case AuthActionTypes.LOGIN_USER:
      console.log(action);
      return {
        ...state,
        phone: action.payload.phone,
        password: action.payload.password,
        isAuth: true,
      };
    case AuthActionTypes.REGISTRATE_USER:
      console.log(action);
      return {
        ...state,
        name: action.payload.name,
        phone: action.payload.phone,
        password: action.payload.password,
        isAuth: true,
      };
    default:
      return state;
  }
};

export const registrate = (payload: any): IAuthAction => ({
  type: AuthActionTypes.REGISTRATE_USER,
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

// export const logout = () => async (dispatch) => {
//   let response = await authAPI.logout();
//   if (response.data.resultCode === 0) {
//     dispatch(getAuthUserData(null, null, null, false));
//   }
// };
