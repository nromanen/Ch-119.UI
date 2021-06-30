import {
  OrderStateI,
  ChangeValueAction,
  OrderActionTypes,
  OrderValues,
  UpdateOrderAction,
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

export const updateOrderState = (order: OrderStateI): UpdateOrderAction => ({
  type: OrderActionTypes.UPDATE_ORDER,
  payload: order,
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
export const finishOrderAction = () => ({
  type: OrderActionTypes.FINISH_ORDER,
});
export const finishOrderSuccessAction = () => ({
  type: OrderActionTypes.FINISH_ORDER_SUCCESS,
});
export const finishOrderErrorAction = () => ({
  type: OrderActionTypes.FINISH_ORDER_ERROR,
});
export const toggleModal = () => ({
  type: OrderActionTypes.TOGGLE_MODAL,
});

export const resetOrderState = () => ({
  type: OrderActionTypes.RESET_ORDER_STATE,
});
