import {
  OrderStateI,
  ChangeValueAction,
  OrderActionTypes,
  OrderValues,
} from '../types/orderTypes';

export const changeOrderValue = (
  prop: keyof OrderStateI,
  value: OrderValues,
): ChangeValueAction => ({
  type: OrderActionTypes.CHANGE_VALUE,
  payload: {
    prop,
    value,
  },
});

export const makeOrderAction = () => ({
  type: OrderActionTypes.MAKE_ORDER,
});
export const makeOrderSuccessAction = () => ({
  type: OrderActionTypes.MAKE_ORDER_SUCCESS,
});
export const makeOrderErrorAction = () => ({
  type: OrderActionTypes.MAKE_ORDER_ERROR,
});
