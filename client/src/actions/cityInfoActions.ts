import { InfoActionTypes } from '../types/cityInfoTypes';
import { CityInfoI } from '../pages/Order/mapService';

export const getCityInfoCreator = (cityName: string) => {
  return {
    type: InfoActionTypes.GET_INFO,
    payload: {
      name: cityName,
    },
  };
};

export const setCityInfoCreator = (info: CityInfoI) => {
  return {
    type: InfoActionTypes.SET_INFO,
    payload: info,
  };
};
