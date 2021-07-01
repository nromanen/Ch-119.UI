import {
  fetchDriverOrderNew,
  fetchDriverOrderHistory,
  changeOrderById,
} from '../services/orderService';
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
  setDriverOrderNewAction,
} from '../actions/driverOrderNewActions';
import { Statuses } from '../constants/statuses';
import { moveOrderToCurrentAction } from './../actions/driverOrderNewActions';

export const getDriverId = (state: any) => state.auth.driver_info.driver_id;

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
}
