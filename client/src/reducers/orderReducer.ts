import { OrderAction, OrderActionTypes } from '../types/orderTypes';
import { OrderStateI } from './../types/orderTypes';

export const initialState: OrderStateI = {
  from: 'Головна 265',
  to: 'Ватутіна 1, Чернівці',
  carType: { name: 'basic', id: 1 },
  extraServices: [],
  paymentType: 'cash',
  price: 0,
  status: 'active',
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
    case OrderActionTypes.CHANGE_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case OrderActionTypes.MAKE_ORDER:
      return { ...state, loading: true, error: false };
    case OrderActionTypes.MAKE_ORDER_SUCCESS:
      return { ...state, loading: false, error: false };
    case OrderActionTypes.MAKE_ORDER_ERROR:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
