import { call, takeEvery, StrictEffect, put, select } from 'redux-saga/effects';
import {
  ChangeStatus,
  DriverOrderNewActionTypes,
} from '../types/driverOrderNew';
import {
  fetchDriverOrderNewErrorAction,
  fetchDriverOrderNewSuccessAction,
  removeOrderFromDriverListAction,
  moveOrderToCurrentAction,
  setDriverOrderNewAction,
} from '../actions/driverOrderNewActions';
import { Statuses } from '../constants/statuses';
import {
  fetchDriverOrderNew,
  changeOrderById,
  fetchDriverOrderCurrent,
  fetchOrderHistory,
} from '../services/orderService';
import { changeFeedbackValues, toggleModal } from '../actions/feedbackActions';
import { getDriverId, getUserId, getUserRole } from '../utils/getters';

function* fetchDriverOrderCurrentWorker(): Generator<StrictEffect, void, any> {
  const driverId = yield select(getDriverId);

  const response = yield call(fetchDriverOrderCurrent(driverId));
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchDriverOrderNewSuccessAction());
    yield put(
      setDriverOrderNewAction({
        list: 'current',
        values: orders,
      }),
    );
  } else {
    yield put(fetchDriverOrderNewErrorAction());
  }
}
function* fetchDriverOrderNewWorker(): Generator<StrictEffect, void, any> {
  const response = yield call(fetchDriverOrderNew);
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchDriverOrderNewSuccessAction());
    yield put(
      setDriverOrderNewAction({
        list: 'active',
        values: orders,
      }),
    );
  } else {
    yield put(fetchDriverOrderNewErrorAction());
  }
}

function* fetchOrderHistoryWorker(): Generator<StrictEffect, void, any> {
  const userId = yield select(getUserId);
  const userRole = yield select(getUserRole);

  const response = yield call(fetchOrderHistory(userId, userRole));
  const orders = response.data.rows;

  if (response.status === 200) {
    yield put(fetchDriverOrderNewSuccessAction());
    yield put(
      setDriverOrderNewAction({
        list: 'history',
        values: orders,
      }),
    );
  } else {
    yield put(fetchDriverOrderNewErrorAction());
  }
}

function* changeStatusWorker(
  action: ChangeStatus,
): Generator<StrictEffect, void, any> {
  const driverId = yield select(getDriverId);
  const { status, id, customerId } = action.payload;

  const response = yield call(changeOrderById(id, { status, driverId }));
  if (status === Statuses.ACCEPTED) {
    yield put(moveOrderToCurrentAction(response.data));
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: id,
        filterList: 'active',
      }),
    );
  }

  if (status === Statuses.CANCELED || status === Statuses.DONE) {
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: id,
        filterList: 'current',
      }),
    );
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

export function* driverOrderNewWatcher() {
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_ACTIVE_ORDERS,
    fetchDriverOrderNewWorker,
  );
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_HISTORY_ORDERS,
    fetchOrderHistoryWorker,
  );
  yield takeEvery(DriverOrderNewActionTypes.CHANGE_STATUS, changeStatusWorker);
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_CURRENT_ORDERS,
    fetchDriverOrderCurrentWorker,
  );
}
