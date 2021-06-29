import { Order } from '../pages/Order/Order';
import { OrderAction, OrderActionTypes } from '../types/orderTypes';
import { OrderStateI } from './../types/orderTypes';

export const initialState: OrderStateI = {
  from: '',
  to: '',
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
  id: undefined,
  // customerId: undefined,
  showModalForUser: false,
  showModalForDriver: false,
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
    case OrderActionTypes.FINISH_ORDER:
      return { ...state, loading: true, error: false };
    case OrderActionTypes.FINISH_ORDER_SUCCESS:
      return { ...state, loading: false, error: false, status: 'finished' };
    case OrderActionTypes.FINISH_ORDER_ERROR:
      return { ...state, loading: false, error: true };
    case OrderActionTypes.TOGGLE_MODAL_FOR_USER:
      return { ...state, showModalForUser: !state.showModalForUser };
    case OrderActionTypes.TOGGLE_MODAL_FOR_DRIVER:
      return { ...state, showModalForDriver: !state.showModalForDriver };
    case OrderActionTypes.RESET_ORDER_STATE:
      return initialState;
    case OrderActionTypes.UPDATE_ORDER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
