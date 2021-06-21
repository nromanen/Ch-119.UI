import { all } from 'redux-saga/effects';

import { cityInfoWatcher } from './infoSaga';
import { mapWatcher } from './mapSaga';
import { createFeedbackWatcher } from './feedbackFormSaga';
import { userInfoWatcher } from './authSaga';
import { orderWatcher } from './orderSaga';

export function* rootWatcher() {
  yield all([
    cityInfoWatcher(),
    mapWatcher(),
    userInfoWatcher(),
    orderWatcher(),
    createFeedbackWatcher(),
  ]);
}
