import { all } from 'redux-saga/effects';
import { cityInfoWatcher } from './infoSaga';
import { mapWatcher } from './mapSaga';
import { userInfoWatcher } from './authSaga';

export function* rootWatcher() {
  yield all([cityInfoWatcher(), mapWatcher(), userInfoWatcher()]);
}
