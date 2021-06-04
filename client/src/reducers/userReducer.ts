import { LOGIN_USER } from '../types/userTypes';

export const initialState = {
  user: {},
};

export const userReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case LOGIN_USER:
      return state;
    default:
      return state;
  }
};
