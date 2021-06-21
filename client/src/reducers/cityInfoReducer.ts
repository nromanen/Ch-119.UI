import { InfoAction, InfoActionTypes } from '../types/cityInfoTypes';
import { CityInfoI } from '../types/cityInfoTypes';

export const initialState: CityInfoI = {
  basePrice: 41,
  basePriceForKm: 10,
  car_types: [
    {
      id: 1,
      name: 'basic',
      city_car_type: {
        carTypeId: 1,
        cityId: 1,
        coef: 1,
      },
    },
  ],
  extra_services: [
    {
      id: 1,
      name: 'Silent driver',
      city_service: {
        price: 11,
        carTypeId: 1,
        cityId: 1,
      },
    },
  ],
  name: '',
  id: 1,
};

export const cityInfoReducer = (
  state = initialState,
  action: InfoAction,
): CityInfoI => {
  switch (action.type) {
    case InfoActionTypes.SET_INFO:
      return { ...action.payload };

    case InfoActionTypes.CHANGE_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};