import axios, { AxiosResponse } from 'axios';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
    REACT_APP_HOST: string;
  };
};

interface CityCarTypeI {
  coef: number;
  createdAt: Date;
  updatedAt: Date;
  carTypeId: number;
  cityId: number;
}
interface CityExtraServiceI {
  price: number;
  createdAt: Date;
  updatedAt: Date;
  carTypeId: number;
  cityId: number;
}

export interface CarTypesI {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  city_car_type: CityCarTypeI;
}
export interface ExtraServicesI {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  city_service: CityExtraServiceI;
}

export interface CityInfoI {
  id: number;
  name: string;
  basePrice: number;
  basePriceForKm: number;
  createdAt?: Date;
  updatedAt?: Date;
  car_types: CarTypesI[];
  extra_services: ExtraServicesI[];
}

export const fetchCityInfo = (name: string) => () => {
  console.log('fetch city = ', name);

  return axios.get<CityInfoI>(`${process.env.REACT_APP_HOST}info`, {
    params: {
      name,
    },
  });

  // if (res.statusText === 'OK') {
  //   console.log(res, 'info');
  //   return res.data.data;
  // }
};
