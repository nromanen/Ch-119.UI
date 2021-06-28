import {
  DriverOrderNewAction,
  DriverOrderNewActionTypes,
} from '../types/driverOrderNew';

export const initialState = {
  list: [],
  currentOrder: null,
};

export const driverOrderNewReducer = (
  state = initialState,
  action: DriverOrderNewAction,
) => {
  switch (action.type) {
    case DriverOrderNewActionTypes.SET_ORDERS:
      return {
        ...state,
        list: action.payload,
      };

    case DriverOrderNewActionTypes.MOVE_TO_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };
    case DriverOrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: null,
      };
    default:
      return state;
  }
};
