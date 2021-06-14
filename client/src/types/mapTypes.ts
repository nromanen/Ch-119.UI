export interface CurrentLocation {
  lat: number;
  lng: number;
}

export interface MapState {
  map: google.maps.Map | null;
  renderer: google.maps.DirectionsRenderer | null;
  directions: google.maps.DirectionsRequest | null;
  directionsResult: google.maps.DirectionsResult | null;
  isMapLoaded: boolean;
  currentLoacation: CurrentLocation | null;
}

type ValueOf<T> = T[keyof T];
export type MapValues = ValueOf<MapState>;

export enum MapActionTypes {
  CHANGE_VALUE = 'CHANGE_MAP_VALUE',
  GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION',
}

export interface GetCurrentLocationAction {
  type: MapActionTypes.GET_CURRENT_LOCATION;
}

export interface ChangeMapValueAction {
  type: MapActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof MapState;
    value: MapValues;
  };
}

export type MapAction = ChangeMapValueAction | GetCurrentLocationAction;
