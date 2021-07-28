import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';
import { mapWatcher } from './mapSaga';
import { feedbackWatcher } from './feedbackSaga';
import { userInfoWatcher } from './authSaga';
import { makeOrderWatcher } from './makeOrderSaga';
import { orderWatcher } from './orderSaga';

export function* rootWatcher() {
  yield all([
    cityInfoWatcher(),
    mapWatcher(),
    userInfoWatcher(),
    makeOrderWatcher(),
    feedbackWatcher(),
    orderWatcher(),
  ]);
}
