import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';

import { OrderActionTypes } from '../types/orderTypes';
import { makeOrder } from '../services/orderService';
import {
  makeOrderErrorAction,
  makeOrderSuccessAction,
} from './../actions/orderActions';

export const getUserID = (state: any) => state.auth.id;
export const getOrder = (state: any) => state.order;

function* makeOrderWorker(): Generator<StrictEffect, void, any> {
  const userID = yield select(getUserID);
  const order = yield select(getOrder);

  try {
    const data = yield call(makeOrder(order, userID));
    if (data.status === 200) {
      yield put(makeOrderSuccessAction());
    } else {
      yield put(makeOrderErrorAction());
    }
  } catch (error) {
    yield put(makeOrderErrorAction());
  }
}

export function* orderWatcher() {
  yield takeEvery(OrderActionTypes.MAKE_ORDER, makeOrderWorker);
}
