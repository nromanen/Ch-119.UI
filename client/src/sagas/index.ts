import { all } from 'redux-saga/effects';
import { userInfoWatcher } from './authSaga';

export function* rootWatcher() {
  yield all([userInfoWatcher()]);
}
