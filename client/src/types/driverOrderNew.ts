import { Statuses } from '../constants/statuses';
import { DriverInfoI, CustomerInfoI } from '../pages/OrderList/OrderItem/OrderItem';

export interface DriverOrderNewStateI {
  history: Array<OrderI>;
  active: Array<OrderI>;
  current: Array<OrderI>;
  loading: false;
  error: null;
}

type Lists = 'history' | 'active' | 'current';

export interface OrderI {
  id: number;
  customer_id: number;
  driver_id: number | null;
  driverId: number | null;
  from: string;
  to: string;
  status: Statuses;
  carTypeId: number;
  car_type: { id: number; name: string };
  extra_services: [number];
  createdAt: Date;
  updatedAt: Date;
  isCard: boolean | null;
  price: string;
  user?: { name: string; phone: string };
  driver?: { carColor: string, carNumber: string, carModel: string, rating: number };
  customerInfo?: CustomerInfoI;
  feedbacks: [string];
}

export interface ChangeStatus {
  type: OrderNewActionTypes.CHANGE_STATUS;
  payload: ChangeStatusPayload;
}
export interface ChangeStatusPayload {
  status: string;
  id: number;
  customerId: number;
}

export interface MoveToCurrentOrder {
  type: OrderNewActionTypes.MOVE_TO_CURRENT_ORDER;
  payload: any;
}

export interface RemoveFromCurrentOrder {
  type: OrderNewActionTypes.REMOVE_FROM_CURRENT_ORDER;
}

export interface RemoveOrderFromDriverListPayload {
  filterKey: keyof OrderI;
  value: any;
  filterList: Lists;
}
export interface RemoveOrderFromDriverList {
  type: OrderNewActionTypes.REMOVE_FROM_ORDER_LIST;
  payload: RemoveOrderFromDriverListPayload;
}

export interface SetOrders {
  type: OrderNewActionTypes.SET_ORDERS;
  payload: SetOrdersPayload;
}
export interface SetOrdersPayload {
  values: Array<any>;
  list: Lists;
}

export interface FetchOrders {
  type: OrderNewActionTypes.FETCH_ACTIVE_ORDERS;
}

export interface FetchOrdersSuccess {
  type: OrderNewActionTypes.FETCH_ORDERS_SUCCESS;
}

export interface FetchOrdersError {
  type: OrderNewActionTypes.FETCH_ORDERS_ERROR;
}

export enum OrderNewActionTypes {
  REMOVE_FROM_CURRENT_ORDER = 'REMOVE_FROM_CURRENT_ORDER',
  REMOVE_FROM_ORDER_LIST = 'REMOVE_FROM_ORDER_LIST',
  MOVE_TO_CURRENT_ORDER = 'MOVE_TO_CURRENT_ORDER',

  CHANGE_STATUS = 'CHANGE_ORDER_STATUS',
  SET_ORDERS = 'SET_ORDERS_FOR_DRIVER',

  FETCH_ACTIVE_ORDERS = 'FETCH_ACTIVE_ORDERS_FOR_DRIVER',
  FETCH_HISTORY_ORDERS = 'FETCH_HISTORY_FOR_DRIVER',
  FETCH_CURRENT_ORDERS = 'FETCH_CURRENT_ORDERS',

  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_FOR_DRIVER_SUCCESS',
  FETCH_ORDERS_ERROR = 'FETCH_ORDERS_FOR_DRIVER_ERROR',
}

export type OrderNewAction =
  | RemoveOrderFromDriverList
  | RemoveFromCurrentOrder
  | MoveToCurrentOrder
  | SetOrders
  | FetchOrders
  | FetchOrdersSuccess
  | FetchOrdersError;


