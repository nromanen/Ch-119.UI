import { ChangeOrderValuesAction, OrderActionTypes } from '../types/orderTypes';

export const changeOrderValues = (props: any): ChangeOrderValuesAction => ({
  type: OrderActionTypes.CHANGE_ORDER_VALUES,
  payload: {
    ...props,
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

export const resetOrderState = () => ({
  type: OrderActionTypes.RESET_ORDER_STATE,
});
