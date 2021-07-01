import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_ORDERS, setOrders } from '../reducers/ordersReducer';
import { fetchOrders } from '../http/ordersApi';

function* fetchOrdersWorker(): any {
    const data = yield call(fetchOrders);
    console.log(data);
    yield put(setOrders(data));
}

export function* ordersWatcher() {
    yield takeEvery(FETCH_ORDERS, fetchOrdersWorker);
}
