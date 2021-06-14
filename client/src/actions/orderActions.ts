import {
  ChangeValueAction,
  OrderActionTypes,
  OrderValues,
} from '../types/orderTypes';
import { OrderState } from '../types/orderTypes';

export const changeValue = (
  prop: keyof OrderState,
  value: OrderValues,
): ChangeValueAction => {
  return {
    type: OrderActionTypes.CHANGE_VALUE,
    payload: {
      prop,
      value,
    },
  };
};
