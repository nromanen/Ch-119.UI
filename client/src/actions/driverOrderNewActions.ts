import { RemoveOrderFromDriverListPayload } from './../types/driverOrderNew';
import {
  OrderNewActionTypes,
  SetOrdersPayload,
} from '../types/driverOrderNew';
import { Statuses } from '../constants/statuses';

interface OrderStatusI {
status: Statuses;
id: number;
customerId?: number;
}

export const changeOrderStatusAction = (payload: OrderStatusI) => {
  return {
    type: OrderNewActionTypes.CHANGE_STATUS,
    payload,
  };
};

export const fetchOrderCurrentAction = () => ({
  type: OrderNewActionTypes.FETCH_CURRENT_ORDERS,
});
export const fetchOrderNewAction = () => ({
  type: OrderNewActionTypes.FETCH_ACTIVE_ORDERS,
});

export const fetchOrderHistoryAction = () => ({
  type: OrderNewActionTypes.FETCH_HISTORY_ORDERS,
});

export const setOrderNewAction = (payload: SetOrdersPayload) => ({
  type: OrderNewActionTypes.SET_ORDERS,
  payload,
});
export const moveOrderToCurrentAction = (payload: any) => ({
  type: OrderNewActionTypes.MOVE_TO_CURRENT_ORDER,
  payload,
});
export const removeOrderFromCurrentAction = () => ({
  type: OrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER,
});
export const removeOrderFromDriverListAction = (
  payload: RemoveOrderFromDriverListPayload,
) => ({
  type: OrderNewActionTypes.REMOVE_FROM_ORDER_LIST,
  payload,
});

export const fetchOrderNewSuccessAction = () => ({
  type: OrderNewActionTypes.FETCH_ORDERS_SUCCESS,
});

export const fetchOrderNewErrorAction = () => ({
  type: OrderNewActionTypes.FETCH_ORDERS_ERROR,
});
