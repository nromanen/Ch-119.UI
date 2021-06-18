import { call, StrictEffect, select, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes } from '../types/userTypes';
import { registration, login, logout, checkAuth } from '../http/userApi';
import { push } from 'react-router-redux';

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
  if (data) {
    yield put({ type: AuthActionTypes.SET_USER_DATA, payload: data });
    yield put(push('/order'));
  } else {
    yield put({ type: AuthActionTypes.HANDLE_ERROR });
  }
}

function* loginUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);
  console.log('userInfoState', userInfoState);

  const data = yield call(login(userInfoState.phone, userInfoState.password));

  if (data) {
    console.log('DATA HERE', data);
    yield put({ type: AuthActionTypes.SET_USER_DATA, payload: data });
    yield put(push('/order' ));
  } else {
    console.log('NO DATA', data);
    yield put({ type: AuthActionTypes.HANDLE_ERROR });
  }// showAlert(status, 'Error') по статусу кольори модалки
}

function* checkAuthUser(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);
  console.log('userInfoState', userInfoState);

  const data = yield call(checkAuth());
  if (data) {
    yield put({type: AuthActionTypes.SET_USER_DATA});
  } else {
    console.log('NO DATA', data);
    yield put({ type: AuthActionTypes.HANDLE_ERROR });
  }// showAlert(status, 'Error') по статусу кольори модалки
}

function* logoutUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);
  console.log('userInfoState', userInfoState);

  const data = yield call(logout());
  yield put(push('/login'));
}

export function* userInfoWatcher() {
  yield takeEvery(AuthActionTypes.REGISTRATE_USER, registrateUserWorker);
  yield takeEvery(AuthActionTypes.LOGIN_USER, loginUserWorker);
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logoutUserWorker);
  yield takeEvery(AuthActionTypes.CHECK_USER_DATA, checkAuthUser);
}
