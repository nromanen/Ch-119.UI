export interface OrderState {
  from: string;
  to: string;
  car_type: string;
  extraServices: Array<any>;
  paymentType: string;
  price: string;
  status: string;
}

export interface ChangeValueAction {
  type: OrderActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof OrderState;
    value: string | string[];
  };
}
export enum OrderActionTypes {
  CHANGE_VALUE = 'CHANGE_VALUE',
}
export type OrderAction = ChangeValueAction;
