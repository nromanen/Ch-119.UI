import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';
import { mapWatcher } from './mapSaga';
import { feedbackWatcher } from './feedbackSaga';
import { userInfoWatcher } from './authSaga';
import { orderWatcher } from './orderSaga';
import { driverOrderNewWatcher } from './driverOrderNewSaga';

export function* rootWatcher() {
  yield all([
    cityInfoWatcher(),
    mapWatcher(),
    userInfoWatcher(),
    orderWatcher(),
    feedbackWatcher(),
    driverOrderNewWatcher(),
  ]);
}
