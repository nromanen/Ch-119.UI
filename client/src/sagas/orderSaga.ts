import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { OrderActionTypes } from '../types/orderTypes';
import { makeOrder } from '../services/orderService';
import { ORDER_USER_ACTIVE_ROUTE } from './../constants/routerConstants';
import {
  changeOrderValue,
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
      yield put(changeOrderValue('id', data.data.id));
      yield put(makeOrderSuccessAction());
      yield put(push(ORDER_USER_ACTIVE_ROUTE));
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
