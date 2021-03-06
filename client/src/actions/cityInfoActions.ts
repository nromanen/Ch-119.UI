import { CityInfoValues, InfoActionTypes } from '../types/cityInfoTypes';
import { CityInfoI } from '../types/cityInfoTypes';

export const getCityInfoCreator = (cityName: string) => ({
    type: InfoActionTypes.GET_INFO,
    payload: {
      name: cityName,
    },
});

export const setCityInfoCreator = (info: CityInfoI) => ({
    type: InfoActionTypes.SET_INFO,
    payload: info,
});

export const changeCityInfoValueCreator = (
  prop: keyof CityInfoI,
  value: CityInfoValues,
) => {
  return {
    type: InfoActionTypes.CHANGE_VALUE,
    payload: {
      prop,
      value,
    },
  };
};
