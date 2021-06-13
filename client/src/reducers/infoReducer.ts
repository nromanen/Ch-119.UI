import { InfoAction, InfoActionTypes } from '../types/infoTypes';
import { CityInfoI } from './../pages/Order/mapService';

export const initialState: CityInfoI = {
  basePrice: 41,
  basePriceForKm: 10,
  car_types: [],
  extra_services: [],
  name: '',
  id: 1,
};

export const infoReducer = (
  state = initialState,
  action: InfoAction,
): CityInfoI => {
  switch (action.type) {
    case InfoActionTypes.SET_INFO:
      return { ...action.payload };
    default:
      return state;
  }
};
