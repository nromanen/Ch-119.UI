export interface InfoState {
  basePrice: number;
  basePriceForKm: number;
  car_types: [];
  extra_services: [];
  name: string;
  id: number;
}

export enum InfoActionTypes {
  GET_INFO = 'GET_INFO',
  SET_INFO = 'SET_INFO',
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

export type InfoAction = GetInfoAction | SetInfoAction;
