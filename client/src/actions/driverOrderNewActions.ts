import { DriverOrderNewActionTypes } from '../types/driverOrderNew';

export const fetchDriverOrderNew = () => ({
  type: DriverOrderNewActionTypes.FETCH_ORDERS,
});

export const setDriverOrderNewAction = (payload: any) => ({
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

export const fetchDriverOrderNewSuccessAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_ORDERS_SUCCESS,
});

export const fetchDriverOrderNewErrorAction = () => ({
  type: DriverOrderNewActionTypes.FETCH_ORDERS_ERROR,
});
