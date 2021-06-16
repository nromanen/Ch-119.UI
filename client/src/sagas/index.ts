import { all } from 'redux-saga/effects';
import { registrateInfoWatcher } from './registrateSaga';
import { loginInfoWatcher } from './loginSaga';

export function* rootWatcher() {
  yield all([registrateInfoWatcher(), loginInfoWatcher()]);
}
