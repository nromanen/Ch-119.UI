import axios from 'axios';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';

import { MapActionTypes } from '../types/mapTypes';
import { changeMapValue } from '../actions/mapActions';
import { getCityInfoCreator } from '../actions/cityInfoActions';
import { changeCityInfoValueCreator } from './../actions/cityInfoActions';

export const getCityNameFromState = (state: any) => state.cityInfo;

const getCityName = (l: any) => () => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    params: {
      key: process.env.REACT_APP_MAP_API_KEY,
      latlng: `${l.lat},${l.lng}`,
      language: 'en',
    },
  });
};

function* getCurrentLocation(): Generator<StrictEffect, void, any> {
  const getCurrentLocationPromise = () =>
    new Promise((res) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        res({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    });

  const currentLocation = yield call(getCurrentLocationPromise);
  yield put(changeMapValue('currentLocation', currentLocation));
  const res = yield call(getCityName(currentLocation));
  const name = res.data.plus_code.compound_code.split(', ')[1].split(' ')[0];
  yield put(changeCityInfoValueCreator('name', name));
  yield put(getCityInfoCreator(name));
  console.log('cityName', name);
}

// function* getCityNameFromLocation(): Generator {
//   const res = yield call(getCityName);

// }

export function* mapWatcher() {
  yield takeEvery(MapActionTypes.GET_CURRENT_LOCATION, getCurrentLocation);
}
