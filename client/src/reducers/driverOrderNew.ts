import { DriverOrderNewStateI } from './../types/driverOrderNew';
import {
  OrderNewAction,
  OrderNewActionTypes,
} from '../types/driverOrderNew';

export const initialState: DriverOrderNewStateI = {
  history: [],
  active: [],
  current: [],
  loading: false,
  error: null,
};

export const orderNewReducer = (
  state = initialState,
  action: OrderNewAction,
) => {
  switch (action.type) {
    case OrderNewActionTypes.SET_ORDERS:
      return {
        ...state,
        [action.payload.list]: action.payload.values,
      };

    case OrderNewActionTypes.MOVE_TO_CURRENT_ORDER:
      return {
        ...state,
        current: [...state.current, action.payload],
      };
    case OrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER:
      return {
        ...state,
        current: [],
      };
    case OrderNewActionTypes.REMOVE_FROM_ORDER_LIST:
      return {
        ...state,
        [action.payload.filterList]: state[action.payload.filterList].filter(
          (order) => {
            const { filterKey, value } = action.payload;

            return order[filterKey] !== value;
          },
        ),
      };
    default:
      return state;
  }
};
