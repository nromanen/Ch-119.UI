import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';
import { mapWatcher } from './mapSaga';

export function* rootWatcher() {
  yield all([cityInfoWatcher(), mapWatcher()]);
}
