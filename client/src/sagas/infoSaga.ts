import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { InfoActionTypes, CityInfoI } from '../types/cityInfoTypes';
import { setCityInfoCreator } from '../actions/cityInfoActions';
import { fetchCityInfo } from '../services/mapService';

export const getCityNameFromState = (state: any) => state.cityInfo;

function* fetchCityInfoWorker(): Generator<StrictEffect, void, any> {
  const cityInfoState = yield select(getCityNameFromState);
  console.log(`getcIty`);
  const data = (yield call(
    fetchCityInfo(cityInfoState.name),
  )) as AxiosResponse<CityInfoI>;

  yield put(setCityInfoCreator(data.data));
}

export function* cityInfoWatcher() {
  yield takeEvery(InfoActionTypes.GET_INFO, fetchCityInfoWorker);
}
