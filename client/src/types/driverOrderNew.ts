import { Statuses } from '../constants/statuses';

export interface DriverOrderNewStateI {
  history: Array<CurrentOrder>;
  active: Array<CurrentOrder>;
  current: Array<CurrentOrder>;
  loading: false;
  error: null;
}

type Lists = 'history' | 'active' | 'current';

export interface CurrentOrder {
  id: number;
  customer_id: number;
  driver_id: number | null;
  driverId: number | null;
  from: string;
  to: string;
  status: Statuses;
  carTypeId: number;
  extra_services: [number];
  createdAt: Date;
  updatedAt: Date;
  isCard: boolean | null;
  price: string;
  user?: { name: string; phone: string };
}

export interface ChangeStatus {
  type: DriverOrderNewActionTypes.CHANGE_STATUS;
  payload: ChangeStatusPayload;
}
export interface ChangeStatusPayload {
  status: string;
  orderId: number;
}

export interface MoveToCurrentOrder {
  type: DriverOrderNewActionTypes.MOVE_TO_CURRENT_ORDER;
  payload: any;
}

export interface RemoveFromCurrentOrder {
  type: DriverOrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER;
}

export interface SetOrders {
  type: DriverOrderNewActionTypes.SET_ORDERS;
  payload: SetOrdersPayload;
}
export interface SetOrdersPayload {
  values: Array<any>;
  list: Lists;
}

export interface FetchOrders {
  type: DriverOrderNewActionTypes.FETCH_ACTIVE_ORDERS;
}

export interface FetchOrdersSuccess {
  type: DriverOrderNewActionTypes.FETCH_ORDERS_SUCCESS;
}

export interface FetchOrdersError {
  type: DriverOrderNewActionTypes.FETCH_ORDERS_ERROR;
}

export enum DriverOrderNewActionTypes {
  REMOVE_FROM_CURRENT_ORDER = 'REMOVE_FROM_CURRENT_ORDER',
  MOVE_TO_CURRENT_ORDER = 'MOVE_TO_CURRENT_ORDER',
  CHANGE_STATUS = 'CHANGE_ORDER_STATUS',
  SET_ORDERS = 'SET_ORDERS_FOR_DRIVER',
  FETCH_ACTIVE_ORDERS = 'FETCH_ACTIVE_ORDERS_FOR_DRIVER',
  FETCH_HISTORY_ORDERS = 'FETCH_HISTORY_FOR_DRIVER',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_FOR_DRIVER_SUCCESS',
  FETCH_ORDERS_ERROR = 'FETCH_ORDERS_FOR_DRIVER_ERROR',
}

export type DriverOrderNewAction =
  | RemoveFromCurrentOrder
  | MoveToCurrentOrder
  | SetOrders
  | FetchOrders
  | FetchOrdersSuccess
  | FetchOrdersError;
