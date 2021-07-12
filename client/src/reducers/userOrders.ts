import { DriverOrderNewStateI } from './../types/driverOrderNew';
import {
  UserOrderActionTypes,
  UserOrdersAction,
  UserOrderStateI,
} from './../types/userOrders';

export const initialState: UserOrderStateI = {
  history: [],
  current: [],
  loading: false,
  error: null,
};

export const userOrdersReducer = (
  state = initialState,
  action: UserOrdersAction,
) => {
  switch (action.type) {
    case UserOrderActionTypes.SET_ORDERS:
      return {
        ...state,
        [action.payload.list]: action.payload.values,
      };

    case UserOrderActionTypes.MOVE_TO_CURRENT_ORDER:
      return {
        ...state,
        current: [...state.current, action.payload],
      };
    case UserOrderActionTypes.REMOVE_FROM_CURRENT_ORDER:
      return {
        ...state,
        current: [],
      };

    case UserOrderActionTypes.REMOVE_FROM_ORDER_LIST:
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
