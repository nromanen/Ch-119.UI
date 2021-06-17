import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { InfoActionTypes } from '../types/cityInfoTypes';
import { fetchCityInfo, CityInfoI } from './../pages/Order/mapService';
import { setCityInfoCreator } from '../actions/cityInfoActions';
import { AxiosResponse } from 'axios';

export const getCityNameFromState = (state: any) => state.cityInfo;

function* fetchCityInfoWorker(): Generator<StrictEffect, void, any> {
  const cityInfoState = yield select(getCityNameFromState);
  console.log('cityInfoState', cityInfoState);

  const data = (yield call(
    fetchCityInfo(cityInfoState.name),
  )) as AxiosResponse<CityInfoI>;

  console.log(data, 'data');

  yield put(setCityInfoCreator(data.data));
}

export function* cityInfoWatcher() {
  yield takeEvery(InfoActionTypes.GET_INFO, fetchCityInfoWorker);
}
