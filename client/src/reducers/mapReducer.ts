import { MapAction, MapActionTypes } from '../types/mapTypes';
import { MapState } from './../types/mapTypes';

export const initialState: MapState = {
  map: null,
  // renderer: null,
  directions: null,
  directionsResult: null,
  isMapLoaded: false,
  currentLocation: null,
};

export const mapReducer = (
  state = initialState,
  action: MapAction,
): MapState => {
  switch (action.type) {
    case MapActionTypes.CHANGE_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
