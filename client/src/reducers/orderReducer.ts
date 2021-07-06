import { OrderAction, OrderActionTypes } from '../types/orderTypes';
import { OrderStateI } from './../types/orderTypes';
import { Statuses } from '../constants/statuses';

export const initialState: OrderStateI = {
  from: '',
  to: '',
  carType: { name: 'basic', id: 1 },
  extraServices: [],
  paymentType: 'cash',
  price: 0,
  status: Statuses.ACTIVE,
  distance: {
    text: '',
    value: 0,
  },
  loading: false,
  error: false,
};

export const orderReducer = (
  state = initialState,
  action: OrderAction,
): OrderStateI => {
  switch (action.type) {
    case OrderActionTypes.CHANGE_ORDER_VALUES:
      return { ...state, ...action.payload };
    case OrderActionTypes.MAKE_ORDER:
      return { ...state, loading: true, error: false };
    case OrderActionTypes.MAKE_ORDER_SUCCESS:
      return { ...state, loading: false, error: false };
    case OrderActionTypes.MAKE_ORDER_ERROR:
      return { ...state, loading: false, error: true };
    case OrderActionTypes.RESET_ORDER_STATE:
      return initialState;
    default:
      return state;
  }
};
