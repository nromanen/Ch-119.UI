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
  showModal: boolean;
}

interface CarTypeI {
  name: string;
  id: number;
}

type ValueOf<T> = T[keyof T];

export type OrderValues = ValueOf<OrderStateI>;

export interface ChangeValueAction {
  type: OrderActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof OrderStateI;
    value: OrderValues;
  };
}

export interface UpdateOrderAction {
  type: OrderActionTypes.UPDATE_ORDER;
  payload: OrderStateI;
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

export interface FinishOrderAction {
  type: OrderActionTypes.FINISH_ORDER;
}

export interface FinishOrderSuccessAction {
  type: OrderActionTypes.FINISH_ORDER_SUCCESS;
}

export interface FinishOrderErrorAction {
  type: OrderActionTypes.FINISH_ORDER_ERROR;
}

export interface ToggleModalAction {
  type: OrderActionTypes.TOGGLE_MODAL;
}

export interface ResetOrderState {
  type: OrderActionTypes.RESET_ORDER_STATE;
}

export enum OrderActionTypes {
  CHANGE_VALUE = 'CHANGE_ORDER_VALUE',
  MAKE_ORDER = 'MAKE_ORDER',
  MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS',
  MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR',
  FINISH_ORDER = 'FINISH_ORDER',
  FINISH_ORDER_SUCCESS = 'FINISH_ORDER_SUCCESS',
  FINISH_ORDER_ERROR = 'FINISH_ORDER_ERROR',
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  RESET_ORDER_STATE = 'RESET_ORDER_STATE',
  UPDATE_ORDER = 'UPDATE_ORDER',
}
export type OrderAction =
  | ChangeValueAction
  | MakeOrderAction
  | MakeOrderSuccessAction
  | MakeOrderErrorAction
  | FinishOrderAction
  | FinishOrderSuccessAction
  | FinishOrderErrorAction
  | ToggleModalAction
  | ResetOrderState
  | UpdateOrderAction;
