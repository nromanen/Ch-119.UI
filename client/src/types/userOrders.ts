import { Statuses } from '../constants/statuses';

export interface UserOrderStateI {
  history: Array<UserCurrentOrder>;
  current: Array<UserCurrentOrder>;
  loading: false;
  error: null;
}

type Lists = 'history' | 'current';

export interface UserCurrentOrder {
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
  driver?: { carType: string; carModel: string; carNumber: string };
}

export interface ChangeStatus {
  type: UserOrderActionTypes.CHANGE_STATUS;
  payload: ChangeStatusPayload;
}
export interface ChangeStatusPayload {
  status: string;
  orderId: number;
}

export interface RemoveFromCurrentOrder {
  type: UserOrderActionTypes.REMOVE_FROM_CURRENT_ORDER;
}

export interface RemoveOrderFromUserListPayload {
  filterKey: keyof UserCurrentOrder;
  value: any;
  filterList: Lists;
}

export interface RemoveOrderFromUserList {
  type: UserOrderActionTypes.REMOVE_FROM_ORDER_LIST;
  payload: RemoveOrderFromUserListPayload;
}

export interface MoveToCurrentOrder {
  type: UserOrderActionTypes.MOVE_TO_CURRENT_ORDER;
  payload: any;
}

export interface SetOrders {
  type: UserOrderActionTypes.SET_ORDERS;
  payload: SetOrdersPayload;
}
export interface SetOrdersPayload {
  values: Array<any>;
  list: Lists;
}

export interface FetchOrdersSuccess {
  type: UserOrderActionTypes.FETCH_ORDERS_SUCCESS;
}

export interface FetchOrdersError {
  type: UserOrderActionTypes.FETCH_ORDERS_ERROR;
}

export enum UserOrderActionTypes {
  REMOVE_FROM_CURRENT_ORDER = 'REMOVE_FROM_USER_CURRENT_ORDER',
  REMOVE_FROM_ORDER_LIST = 'REMOVE_FROM_USER_ORDER_LIST',
  MOVE_TO_CURRENT_ORDER = 'MOVE_TO_USER_CURRENT_ORDER',

  CHANGE_STATUS = 'CHANGE_USER_ORDER_STATUS',
  SET_ORDERS = 'SET_ORDERS_FOR_USER',

  FETCH_HISTORY_ORDERS = 'FETCH_HISTORY_FOR_USER',
  FETCH_CURRENT_ORDERS = 'FETCH_USER_CURRENT_ORDERS',

  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_FOR_USER_SUCCESS',
  FETCH_ORDERS_ERROR = 'FETCH_ORDERS_FOR_USER_ERROR',
}

export type UserOrdersAction =
  | MoveToCurrentOrder
  | RemoveFromCurrentOrder
  | RemoveOrderFromUserList
  | SetOrders
  | FetchOrdersSuccess
  | FetchOrdersError;
