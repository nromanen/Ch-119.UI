import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { InfoActionTypes } from '../types/infoTypes';
import { fetchCityInfo, CityInfoI } from './../pages/Order/mapService';
import { setInfoCreator } from '../actions/infoActions';
import { AxiosResponse } from 'axios';

function* fetchCityInfoWorker(): Generator<StrictEffect, void, any> {
  const data = (yield call(fetchCityInfo)) as AxiosResponse<CityInfoI>;
  yield put(setInfoCreator(data.data));
}

export function* cityInfoWatcher() {
  yield takeEvery(InfoActionTypes.GET_INFO, fetchCityInfoWorker);
}
