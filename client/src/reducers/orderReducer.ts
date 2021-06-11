import { OrderAction, OrderActionTypes } from '../types/orderTypes';
import { OrderState } from './../types/orderTypes';

export const initialState: OrderState = {
  from: 'Головна 265',
  to: 'Ватутіна 1, Чернівці',
  car_type: 'basic',
  extraServices: [],
  paymentType: 'cash',
  price: '11',
  status: 'active',
};

export const orderReducer = (
  state = initialState,
  { type, payload }: OrderAction,
): OrderState => {
  switch (type) {
    case OrderActionTypes.CHANGE_VALUE:
      return { ...state, [payload.prop]: payload.value };

    default:
      return state;
  }
};
