import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';
import { createFeedbackWatcher } from './feedbackFormSaga';
import { userInfoWatcher } from './authSaga';

export function* rootWatcher() {
  yield all([cityInfoWatcher(), createFeedbackWatcher(), userInfoWatcher()]);
}
