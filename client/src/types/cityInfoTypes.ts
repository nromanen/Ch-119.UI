export interface InfoState {
  basePrice: number;
  basePriceForKm: number;
  car_types: [];
  extra_services: [];
  name: string;
  id: number;
}

type ValueOf<T> = T[keyof T];
export type CityInfoValues = ValueOf<InfoState>;

export enum InfoActionTypes {
  GET_INFO = 'GET_INFO',
  SET_INFO = 'SET_INFO',
  CHANGE_VALUE = 'CHANGE_CITY_INFO_VALUE',
}

export interface ChangeMapValue {
  type: InfoActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof InfoState;
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
  payload: InfoState;
}

export type InfoAction = GetInfoAction | SetInfoAction | ChangeMapValue;
