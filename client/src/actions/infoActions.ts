import { InfoActionTypes } from '../types/infoTypes';
import { CityInfoI } from './../pages/Order/mapService';

export const getInfoCreator = (cityName: string) => {
  return {
    type: InfoActionTypes.GET_INFO,
    payload: {
      name: cityName,
    },
  };
};

export const setInfoCreator = (info: CityInfoI) => {
  return {
    type: InfoActionTypes.SET_INFO,
    payload: info,
  };
};
