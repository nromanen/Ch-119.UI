import { call, StrictEffect, select, put, takeEvery } from 'redux-saga/effects';
import {
  AuthActionTypes,
} from '../types/userTypes';
import { registration } from '../http/userApi';


export const getUserFromState = (state: any) => state.auth;

function* registrateUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);
  console.log('userInfoState', userInfoState);

  const data = yield call(
      registration(
          userInfoState.name,
          userInfoState.phone,
          userInfoState.password,
      ),
  );

  yield put({type: AuthActionTypes.SET_USER_DATA, payload: data});
}

export function* registrateInfoWatcher() {
  yield takeEvery(AuthActionTypes.REGISTRATE_USER, registrateUserWorker);
}
