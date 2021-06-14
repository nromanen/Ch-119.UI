import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { InfoActionTypes } from '../types/cityInfoTypes';
import { fetchCityInfo, CityInfoI } from './../pages/Order/mapService';
import { setCityInfoCreator } from '../actions/cityInfoActions';
import { AxiosResponse } from 'axios';
import { useTypedSelector } from './../hooks/useTypedSelector';

function* fetchCityInfoWorker(): Generator<StrictEffect, void, any> {
  const data = (yield call(fetchCityInfo)) as AxiosResponse<CityInfoI>;
  yield put(setCityInfoCreator(data.data));
}

export function* cityInfoWatcher() {
  yield takeEvery(InfoActionTypes.GET_INFO, fetchCityInfoWorker);
}
