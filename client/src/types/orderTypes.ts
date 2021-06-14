export interface DistanceI {
  text: string;
  value: number | null;
}

export interface OrderState {
  from: string;
  to: string;
  car_type: string;
  extraServices: Array<any>;
  paymentType: string;
  price: number;
  status: string;
  distance: DistanceI;
}

export type OrderValues = string | string[] | number;

export interface ChangeValueAction {
  type: OrderActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof OrderState;
    value: OrderValues;
  };
}
export enum OrderActionTypes {
  CHANGE_VALUE = 'CHANGE_VALUE',
}
export type OrderAction = ChangeValueAction;
