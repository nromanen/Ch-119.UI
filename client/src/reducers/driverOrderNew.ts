import { DriverOrderNewStateI } from './../types/driverOrderNew';
import {
  DriverOrderNewAction,
  DriverOrderNewActionTypes,
} from '../types/driverOrderNew';

export const initialState: DriverOrderNewStateI = {
  history: [],
  active: [],
  current: [],
  loading: false,
  error: null,
};

export const driverOrderNewReducer = (
  state = initialState,
  action: DriverOrderNewAction,
) => {
  switch (action.type) {
    case DriverOrderNewActionTypes.SET_ORDERS:
      return {
        ...state,
        [action.payload.list]: action.payload.values,
      };

    case DriverOrderNewActionTypes.MOVE_TO_CURRENT_ORDER:
      return {
        ...state,
        current: [...state.current, action.payload],
      };
    case DriverOrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER:
      return {
        ...state,
        current: [],
      };
    default:
      return state;
  }
};
