import { InfoActionTypes } from '../types/infoTypes';
import { CityInfoI } from './../pages/Order/mapService';

export const getInfoCreator = (cityName: string) => {
  console.log('get info creator');

  return {
    type: InfoActionTypes.GET_INFO,
    payload: {
      name: cityName,
    },
  };
};

export const setInfoCreator = (info: CityInfoI) => {
  console.log('set info creator', info);

  return {
    type: InfoActionTypes.SET_INFO,
    payload: info,
  };
};
