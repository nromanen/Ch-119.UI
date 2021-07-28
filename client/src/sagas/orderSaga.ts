import { CURRENT_ORDER_ROUTE, MAKE_ORDER_ROUTE } from '../constants/routerConstants';
import { push } from 'react-router-redux';
import { call, takeEvery, StrictEffect, put, select } from 'redux-saga/effects';
import {
  ChangeStatus,
  OrderNewActionTypes,
} from '../types/driverOrderNew';
import {
  fetchOrderNewErrorAction,
  fetchOrderNewSuccessAction,
  removeOrderFromDriverListAction,
  moveOrderToCurrentAction,
  setOrderNewAction,
} from '../actions/driverOrderNewActions';

import { Statuses } from '../constants/statuses';
import {
  fetchDriverOrderNew,
  changeOrderStatusById,
  fetchOrderCurrent,
  fetchOrderHistory,
} from '../services/orderService';
import { changeFeedbackValues, toggleModal } from '../actions/feedbackActions';
import { getDriverId, getUserId, getUserRoleAsString } from '../utils/getters';

function* fetchOrderCurrentWorker(): Generator<StrictEffect, void, any> {
  const userId = yield select(getUserId);
  const userRole = yield select(getUserRoleAsString);

  const response = yield call(fetchOrderCurrent(userId, userRole));
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchOrderNewSuccessAction());
    yield put(
      setOrderNewAction({
        list: 'current',
        values: orders,
      }),
    );
  } else {
    yield put(fetchOrderNewErrorAction());
  }
}

function* fetchActiveOrdersWorker(): Generator<StrictEffect, void, any> {
  const response = yield call(fetchDriverOrderNew);
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchOrderNewSuccessAction());
    yield put(
      setOrderNewAction({
        list: 'active',
        values: orders,
      }),
    );
  } else {
    yield put(fetchOrderNewErrorAction());
  }
}

function* fetchOrderHistoryWorker(): Generator<StrictEffect, void, any> {
  const userId = yield select(getUserId);
  const userRole = yield select(getUserRoleAsString);

  const response = yield call(fetchOrderHistory(userId, userRole));
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchOrderNewSuccessAction());
    yield put(
      setOrderNewAction({
        list: 'history',
        values: orders,
      }),
    );
  } else {
    yield put(fetchOrderNewErrorAction());
  }
}

function* changeStatusWorker(
  action: ChangeStatus,
): Generator<StrictEffect, void, any> {
  const driverId = yield select(getDriverId);
  const { status, id, customerId } = action.payload;

  const response = yield call(changeOrderStatusById(id, { status, driverId }));
  if (status === Statuses.ACCEPTED) {
    yield put(moveOrderToCurrentAction(response.data));
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: id,
        filterList: 'active',
      }),
    );
    if (driverId) {
      yield put(push(CURRENT_ORDER_ROUTE));
    }
  }

  if (status === Statuses.CANCELED || status === Statuses.DONE) {
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: id,
        filterList: 'current',
      }),
    );
    if (!driverId) {
      yield put(push(MAKE_ORDER_ROUTE));
    }
  }

  if (status === Statuses.FINISHED) {
    const orderProps = {
      orderId: id,
      customerId,
    };
    yield put(changeFeedbackValues(orderProps));
    yield put(toggleModal());
  }
}

export function* orderWatcher() {
  yield takeEvery(
    OrderNewActionTypes.FETCH_ACTIVE_ORDERS,
    fetchActiveOrdersWorker,
  );
  yield takeEvery(
    OrderNewActionTypes.FETCH_CURRENT_ORDERS,
    fetchOrderCurrentWorker,
  );
  yield takeEvery(
    OrderNewActionTypes.FETCH_HISTORY_ORDERS,
    fetchOrderHistoryWorker,
  );
  yield takeEvery(
    OrderNewActionTypes.CHANGE_STATUS,
    changeStatusWorker,
  );
}
