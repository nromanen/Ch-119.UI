import { ChangeValueAction, OrderActionTypes } from '../types/orderTypes';
import { OrderState } from './../types/orderTypes';

export const changeValue = (
  prop: keyof OrderState,
  value: string | string[],
): ChangeValueAction => {
  return {
    type: OrderActionTypes.CHANGE_VALUE,
    payload: {
      prop,
      value,
    },
  };
};
