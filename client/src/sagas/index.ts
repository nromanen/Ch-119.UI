import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';

export function* rootWatcher() {
  yield all([cityInfoWatcher()]);
}
