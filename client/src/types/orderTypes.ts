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
  customerId?: number;
  showModalForUser: boolean;
  showModalForDriver: boolean;
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

export interface ToggleModalForUserAction {
  type: OrderActionTypes.TOGGLE_MODAL_FOR_USER;
}

export interface ToggleModalForDriverAction {
  type: OrderActionTypes.TOGGLE_MODAL_FOR_DRIVER;
}
export interface ResetOrderState {
  type: OrderActionTypes.RESET_ORDER_STATE
}

export enum OrderActionTypes {
  CHANGE_VALUE = 'CHANGE_ORDER_VALUE',
  MAKE_ORDER = 'MAKE_ORDER',
  MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS',
  MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR',
  FINISH_ORDER = 'FINISH_ORDER',
  FINISH_ORDER_SUCCESS = 'FINISH_ORDER_SUCCESS',
  FINISH_ORDER_ERROR = 'FINISH_ORDER_ERROR',
  TOGGLE_MODAL_FOR_USER = 'TOGGLE_MODAL_FOR_USER',
  TOGGLE_MODAL_FOR_DRIVER = 'TOGGLE_MODAL_FOR_DRIVER',
  RESET_ORDER_STATE = 'RESET_ORDER_STATE'
}
export type OrderAction =
  | ChangeValueAction
  | MakeOrderAction
  | MakeOrderSuccessAction
  | MakeOrderErrorAction
  | FinishOrderAction
  | FinishOrderSuccessAction
  | FinishOrderErrorAction
  | ToggleModalForUserAction
  | ToggleModalForDriverAction
  | ResetOrderState;
