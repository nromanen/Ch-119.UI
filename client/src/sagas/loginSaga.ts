import { call, StrictEffect, select, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes } from '../types/userTypes';
import { login } from '../http/userApi';

export const getUserFromState = (state: any) => state.auth;

function* loginUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);
  console.log('userInfoState', userInfoState);

  const data = yield call(login(userInfoState.phone, userInfoState.password));

  yield put({ type: AuthActionTypes.SET_USER_DATA, payload: data });
}

export function* loginInfoWatcher() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, loginUserWorker);
}
