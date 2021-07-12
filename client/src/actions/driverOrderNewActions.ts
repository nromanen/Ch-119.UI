import { RemoveOrderFromDriverListPayload } from './../types/driverOrderNew';
import {
  DriverOrderNewActionTypes,
  SetOrdersPayload,
} from '../types/driverOrderNew';

export const changeOrderStatusAction = (payload: any) => {
  return {
    type: DriverOrderNewActionTypes.CHANGE_STATUS,
    payload,
  };
};

export const fetchDriverOrderCurrentAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_CURRENT_ORDERS,
});
export const fetchDriverOrderNewAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_ACTIVE_ORDERS,
});

export const fetchDriverOrderHistoryAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_HISTORY_ORDERS,
});

export const setDriverOrderNewAction = (payload: SetOrdersPayload) => ({
  type: DriverOrderNewActionTypes.SET_ORDERS,
  payload,
});
export const moveOrderToCurrentAction = (payload: any) => ({
  type: DriverOrderNewActionTypes.MOVE_TO_CURRENT_ORDER,
  payload,
});
export const removeOrderFromCurrentAction = () => ({
  type: DriverOrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER,
});
export const removeOrderFromDriverListAction = (
  payload: RemoveOrderFromDriverListPayload,
) => ({
  type: DriverOrderNewActionTypes.REMOVE_FROM_ORDER_LIST,
  payload,
});

export const fetchDriverOrderNewSuccessAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_ORDERS_SUCCESS,
});

export const fetchDriverOrderNewErrorAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_ORDERS_ERROR,
});
