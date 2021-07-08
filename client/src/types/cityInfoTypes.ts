interface CityCarTypeI {
  coef: number;
  createdAt?: Date;
  updatedAt?: Date;
  carTypeId: number;
  cityId: number;
}

export interface CarTypesSelectI {
  id: string;
  selectedValue: string;
  onChange: (e: any) => void;
  carTypes?: CarTypesI[];
}

interface CityExtraServiceI {
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  carTypeId: number;
  cityId: number;
}

export interface PricePropsI {
  price: number;
  currencyCodePoint?: number;
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

export interface ExtraServiceItemI {
  id: string | number;
  name: string;
  onExtraServicesChanged: (e: any) => any;
  isActive: boolean;
  showTitle: boolean;
  iconActiveClass?: string;
  iconClasses: string[];
}

export interface ExtraServicesSelectI {
  title?: string;
  avaliableInCityExtraServices: ExtraServicesI[] | undefined;
  activeExtraServices: number[];
  onExtraServicesChanged: () => any;
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
