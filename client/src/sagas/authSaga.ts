import { call, StrictEffect, select, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes } from '../types/userTypes';
import {
  registration,
  login,
  logout,
  checkAuth,
  registrationDriver,
} from '../http/userApi';
import { push } from 'react-router-redux';
import { ORDER_ROUTE, LOGIN_ROUTE, ORDER_ACTIVE_ROUTE } from '../constants/routerConstants';
import { resetOrderState } from '../actions/orderActions';

export const getUserFromState = (state: any) => state.auth;

function* registrateUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);

  if (!userInfoState.isDriver) {
    const data = yield call(
      registration(
        userInfoState.name,
        userInfoState.phone,
        userInfoState.password,
      ),
    );
    if (data) {
      yield put({ type: AuthActionTypes.SET_USER_DATA, payload: data });
      yield put(push(ORDER_ROUTE));
    } else {
      yield put({ type: AuthActionTypes.HANDLE_ERROR, payload: {data: data, hasError: true} });
    }
  }
}

function* registrateDriverWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);

  if (userInfoState.isDriver) {
    const data = yield call(
      registrationDriver(
        userInfoState.name,
        userInfoState.phone,
        userInfoState.password,
        userInfoState.driver_info.car_color,
        userInfoState.driver_info.car_model,
        userInfoState.driver_info.car_number,
      ),
    );
    if (data.id) {
      yield put({ type: AuthActionTypes.SET_DRIVER_DATA, payload: data });
      yield put(push(ORDER_ROUTE));
    } else {
      yield put({ type: AuthActionTypes.HANDLE_ERROR, payload: {data: data, hasError: true} });
    }
  }
}

function* loginUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);

  const data = yield call(login(userInfoState.phone, userInfoState.password));

  if (data.id) {
    if (!data.driver_info) {
    yield put({ type: AuthActionTypes.SET_USER_DATA, payload: data });
    yield put(push(ORDER_ROUTE));
    } else {
      yield put({ type: AuthActionTypes.SET_DRIVER_DATA, payload: data });
      yield put(push(ORDER_ACTIVE_ROUTE));
    }
  } else {
    yield put({ type: AuthActionTypes.HANDLE_ERROR, payload: {data: data, hasError: true} });
  }
}

function* checkAuthUser(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);

  const data = yield call(checkAuth());
  if (data) {
    yield put({ type: AuthActionTypes.SET_USER_DATA });
  } else {
    yield put({ type: AuthActionTypes.HANDLE_ERROR });
  }
}

function* logoutUserWorker(): Generator<StrictEffect, void, any> {
  const userInfoState = yield select(getUserFromState);

  const data = yield call(logout());
  yield put(resetOrderState());
  yield put(push(LOGIN_ROUTE));
}

export function* userInfoWatcher() {
  yield takeEvery(AuthActionTypes.REGISTRATE_USER, registrateUserWorker);
  yield takeEvery(AuthActionTypes.REGISTRATE_DRIVER, registrateDriverWorker);
  yield takeEvery(AuthActionTypes.LOGIN_USER, loginUserWorker);
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logoutUserWorker);
  yield takeEvery(AuthActionTypes.CHECK_USER_DATA, checkAuthUser);
}
