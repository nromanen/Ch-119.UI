import { fetchDriverOrderNew } from '../services/orderService';
import { call, takeEvery, StrictEffect, put } from 'redux-saga/effects';
import { DriverOrderNewActionTypes } from '../types/driverOrderNew';
import {
  fetchDriverOrderNewSuccessAction,
  setDriverOrderNewAction,
} from '../actions/driverOrderNewActions';
import { fetchDriverOrderNewErrorAction } from './../actions/driverOrderNewActions';

function* fetchDriverOrderNewWorker(): Generator<StrictEffect, void, any> {
  const response = yield call(fetchDriverOrderNew);
  const orders = response.data.rows;

  if (response.status === 200) {
    console.log(`newOrders`, orders);
    yield put(fetchDriverOrderNewSuccessAction());
    yield put(setDriverOrderNewAction(orders));
  } else {
    yield put(fetchDriverOrderNewErrorAction());
  }
}

export function* driverOrderNewWatcher() {
  yield takeEvery(
    DriverOrderNewActionTypes.FETCH_ORDERS,
    fetchDriverOrderNewWorker,
  );
}
