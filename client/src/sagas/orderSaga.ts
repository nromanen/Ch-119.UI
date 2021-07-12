import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { OrderActionTypes } from '../types/orderTypes';
import { makeOrder } from '../services/orderService';
import { ORDER_ACTIVE_ROUTE, ORDER_USER_ROUTE } from './../constants/routerConstants';
import {
  changeOrderValues,
  makeOrderErrorAction,
  makeOrderSuccessAction,
  resetOrderState,
} from './../actions/orderActions';

export const getUserID = (state: any) => state.auth.id;
export const getOrder = (state: any) => state.order;
export const getCurrentOrder = (state: any) => state.driverOrders;

function* makeOrderWorker(): Generator<StrictEffect, void, any> {
  const userID = yield select(getUserID);
  const order = yield select(getOrder);

  try {
    const data = yield call(makeOrder(order, userID));
    if (data.status === 200) {
      yield put(
        changeOrderValues({
          id: data.data.id,
          customer_id: data.data.customer_id,
        }),
      );
      yield put(makeOrderSuccessAction());
      yield put(resetOrderState());
      yield put(push(ORDER_USER_ROUTE + data.data.id));
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
