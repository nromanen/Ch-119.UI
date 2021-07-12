import { UserOrderActionTypes } from '../types/userOrders';
import {
  takeEvery,
  put,
  call,
  select,
  StrictEffect,
  take,
} from 'redux-saga/effects';
import { Statuses } from '../constants/statuses';
import {
  fetchUserOrderCurrentAction,
  fetchUserOrderErrorAction,
  fetchUserOrderSuccessAction,
  setUserOrderAction,
} from './../actions/userOrdersActions';

import { removeOrderFromUserListAction } from './../actions/userOrdersActions';
import { changeOrderById } from '../services/orderService';
import { toggleModal } from './../actions/feedbackActions';
import {
  fetchUserOrderCurrent,
  fetchUserOrderHistory,
} from './../services/orderService';

export const getUserId = (state: any) => state.auth.id;

function* fetchUserOrderCurrentWorker(): Generator<StrictEffect, void, any> {
  const userId = yield select(getUserId);

  const response = yield call(fetchUserOrderCurrent(userId));
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchUserOrderSuccessAction());
    yield put(
      setUserOrderAction({
        list: 'current',
        values: orders,
      }),
    );
  } else {
    yield put(fetchUserOrderErrorAction());
  }
}

function* fetchUserOrderHistoryWorker(): Generator<StrictEffect, void, any> {
  const userId = yield select(getUserId);

  const response = yield call(fetchUserOrderHistory(userId));
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchUserOrderSuccessAction());
    yield put(
      setUserOrderAction({
        list: 'history',
        values: orders,
      }),
    );
  } else {
    yield put(fetchUserOrderErrorAction());
  }
}

function* changeStatusWorker(action: any): Generator<StrictEffect, void, any> {
  const { status, id } = action.payload;

  const response = yield call(changeOrderById(id, { status }));

  if (status === Statuses.CANCELED) {
    yield put(
      removeOrderFromUserListAction({
        filterKey: 'id',
        value: id,
        filterList: 'current',
      }),
    );
  }
}

export function* userOrderWatcher() {
  yield takeEvery(
    UserOrderActionTypes.FETCH_HISTORY_ORDERS,
    fetchUserOrderHistoryWorker,
  );
  yield takeEvery(UserOrderActionTypes.CHANGE_STATUS, changeStatusWorker);
  yield takeEvery(
    UserOrderActionTypes.FETCH_CURRENT_ORDERS,
    fetchUserOrderCurrentWorker,
  );
}
