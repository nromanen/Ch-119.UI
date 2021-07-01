import {
  call,
  takeEvery,
  StrictEffect,
  put,
  select,
  take,
} from 'redux-saga/effects';
import { DriverOrderNewActionTypes } from '../types/driverOrderNew';
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
  fetchDriverOrderHistory,
  changeOrderById,
  fetchDriverOrderCurrent,
} from '../services/orderService';

export const getDriverId = (state: any) => state.auth.driver_info.driver_id;

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

function* fetchDriverOrderHistoryWorker(): Generator<StrictEffect, void, any> {
  const driverId = yield select(getDriverId);

  const response = yield call(fetchDriverOrderHistory(driverId));
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

function* changeStatusWorker(): Generator<StrictEffect, void, any> {
  const { payload } = yield take(DriverOrderNewActionTypes.CHANGE_STATUS);
  const driverId = yield select(getDriverId);
  const { status, id } = payload;
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

  if (
    status === Statuses.CANCELED ||
    status === Statuses.FINISHED ||
    status === Statuses.DONE
  ) {
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: id,
        filterList: 'current',
      }),
    );
  }
  console.log(`response`, response.data);
}

// function* changeStatusWorker(): Generator<StrictEffect, void, any> {

//   const response = yield call(fetchDriverOrderHistory(driverId));
//   const orders = response.data.rows;

//   if (response.status === 200) {
//     console.log(`change status`, orders);
//     yield put(fetchDriverOrderNewSuccessAction());
//     yield put(
//       setDriverOrderNewAction({
//         list: 'history',
//         values: orders,
//       }),
//     );
//   } else {
//     yield put(fetchDriverOrderNewErrorAction());
//   }
// }

export function* driverOrderNewWatcher() {
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_ACTIVE_ORDERS,
    fetchDriverOrderNewWorker,
  );
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_HISTORY_ORDERS,
    fetchDriverOrderHistoryWorker,
  );
  yield takeEvery(DriverOrderNewActionTypes.CHANGE_STATUS, changeStatusWorker);
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_CURRENT_ORDERS,
    fetchDriverOrderCurrentWorker,
  );
}
