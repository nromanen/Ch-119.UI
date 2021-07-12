import {
  UserOrderActionTypes,
  SetOrdersPayload,
  RemoveOrderFromUserListPayload,
} from '../types/userOrders';

export const changeOrderStatusAction = (payload: any) => {
  return {
    type: UserOrderActionTypes.CHANGE_STATUS,
    payload,
  };
};

export const fetchUserOrderCurrentAction = () => ({
  type: UserOrderActionTypes.FETCH_CURRENT_ORDERS,
});

export const fetchUserOrderHistoryAction = () => ({
  type: UserOrderActionTypes.FETCH_HISTORY_ORDERS,
});

export const setUserOrderAction = (payload: SetOrdersPayload) => ({
  type: UserOrderActionTypes.SET_ORDERS,
  payload,
});
export const moveOrderToCurrentAction = (payload: any) => ({
  type: UserOrderActionTypes.MOVE_TO_CURRENT_ORDER,
  payload,
});
export const removeUserOrderFromCurrentAction = () => ({
  type: UserOrderActionTypes.REMOVE_FROM_CURRENT_ORDER,
});

export const removeOrderFromUserListAction = (
  payload: RemoveOrderFromUserListPayload,
) => ({
  type: UserOrderActionTypes.REMOVE_FROM_ORDER_LIST,
  payload,
});

export const fetchUserOrderSuccessAction = () => ({
  type: UserOrderActionTypes.FETCH_ORDERS_SUCCESS,
});

export const fetchUserOrderErrorAction = () => ({
  type: UserOrderActionTypes.FETCH_ORDERS_ERROR,
});
