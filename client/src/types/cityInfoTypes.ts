interface CityCarTypeI {
  coef: number;
  createdAt?: Date;
  updatedAt?: Date;
  carTypeId: number;
  cityId: number;
}
interface CityExtraServiceI {
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  carTypeId: number;
  cityId: number;
}

export interface CarTypesI {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  city_car_type: CityCarTypeI;
}
export interface ExtraServicesI {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
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

type ValueOf<T> = T[keyof T];
export type CityInfoValues = ValueOf<CityInfoI>;

export enum InfoActionTypes {
  GET_INFO = 'GET_INFO',
  SET_INFO = 'SET_INFO',
  CHANGE_VALUE = 'CHANGE_CITY_INFO_VALUE',
}

export interface ChangeMapValue {
  type: InfoActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof CityInfoI;
    value: CityInfoValues;
  };
}
export interface GetInfoAction {
  type: InfoActionTypes.GET_INFO;
  payload: {
    name: string;
  };
}
export interface SetInfoAction {
  type: InfoActionTypes.SET_INFO;
  payload: CityInfoI;
}

export type InfoAction = GetInfoAction | SetInfoAction | ChangeMapValue;
