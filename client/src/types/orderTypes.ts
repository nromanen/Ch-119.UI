export interface OrderStateI {
  from: string;
  to: string;
  carType: CarTypeI;
  extraServices: Array<any>;
  paymentType: string;
  price: number;
  status: string;
  distance: google.maps.Distance | undefined;
  loading: boolean;
  error: boolean;
  id?: number;
  customer_id?: number;
  driverId?: number;
}

interface CarTypeI {
  name: string;
  id: number;
}

type ValueOf<T> = T[keyof T];

export type OrderValues = ValueOf<OrderStateI>;

export interface ChangeOrderValuesAction {
  type: OrderActionTypes.CHANGE_ORDER_VALUES;
  payload: {};
}

export interface MakeOrderAction {
  type: OrderActionTypes.MAKE_ORDER;
}
export interface MakeOrderSuccessAction {
  type: OrderActionTypes.MAKE_ORDER_SUCCESS;
}

export interface MakeOrderErrorAction {
  type: OrderActionTypes.MAKE_ORDER_ERROR;
}

export interface ResetOrderState {
  type: OrderActionTypes.RESET_ORDER_STATE;
}

export enum OrderActionTypes {
  CHANGE_ORDER_VALUES = 'CHANGE_ORDER_VALUES',
  MAKE_ORDER = 'MAKE_ORDER',
  MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS',
  MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR',
  FINISH_ORDER = 'FINISH_ORDER',
  FINISH_ORDER_SUCCESS = 'FINISH_ORDER_SUCCESS',
  FINISH_ORDER_ERROR = 'FINISH_ORDER_ERROR',
  RESET_ORDER_STATE = 'RESET_ORDER_STATE',
  UPDATE_ORDER = 'UPDATE_ORDER',
}
export type OrderAction =
  | ChangeOrderValuesAction
  | MakeOrderAction
  | MakeOrderSuccessAction
  | MakeOrderErrorAction
  | ResetOrderState;
