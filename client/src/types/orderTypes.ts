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

export enum OrderActionTypes {
  CHANGE_VALUE = 'CHANGE_ORDER_VALUE',
  MAKE_ORDER = 'MAKE_ORDER',
  MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS',
  MAKE_ORDER_ERROR = 'MAKE_ORDER_ERROR',
}
export type OrderAction =
  | ChangeValueAction
  | MakeOrderAction
  | MakeOrderSuccessAction
  | MakeOrderErrorAction;
