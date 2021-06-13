import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { InfoActionTypes } from '../types/infoTypes';
import { fetchCityInfo, CityInfoI } from './../pages/Order/mapService';
import { setInfoCreator } from '../actions/infoActions';
import { AxiosResponse } from 'axios';

function* fetchCityInfoWorker(): Generator<StrictEffect, void, any> {
  console.log('fetch city worker');

  const data = (yield call(fetchCityInfo)) as AxiosResponse<CityInfoI>;
  console.log('info in saga', data);
  // transform data

  yield put(setInfoCreator(data.data));
}

export function* cityInfoWatcher() {
  yield takeEvery(InfoActionTypes.GET_INFO, fetchCityInfoWorker);
}
