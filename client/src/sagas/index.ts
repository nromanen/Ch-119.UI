import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';
import { createFeedbackWatcher } from './feedbackFormSaga';

export function* rootWatcher() {
  yield all([cityInfoWatcher(), createFeedbackWatcher()]);
}
