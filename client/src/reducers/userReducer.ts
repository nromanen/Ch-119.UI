import { LOGIN_USER, SET_USER_DATA } from '../types/userTypes';
import { check } from '../http/userApi';

export const initialState = {
  refreshToken: null,
  accessToken: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const setAuthUserData = (
    refreshToken: string,
    accessToken: string,
    isAuth: boolean,
) => ({
  type: SET_USER_DATA,
  payload: { refreshToken, accessToken, isAuth },
});

export const getAuthUserData = () => async (dispatch: any) => {
  const response: any = await check();

  if (response.data.resultCode === 0) {
    const { refreshToken, accessToken } = response.data.data;
    dispatch(setAuthUserData(refreshToken, accessToken, true));
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

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_USER:
      return state;
    default:
      return state;
  }
};
