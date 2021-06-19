import axios from 'axios';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
    REACT_APP_SERVER_URL: string;
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
  const response = axios.get<CityInfoI>(
    `${process.env.REACT_APP_SERVER_URL}info`,
    {
      params: {
        name,
      },
    },
  );
  return response;
};
