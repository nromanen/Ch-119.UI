import {
  OrderState,
  ChangeValueAction,
  OrderActionTypes,
  OrderValues,
} from '../types/orderTypes';

export const changeOrderValue = (
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
