import {
  ChangeMapValueAction,
  MapActionTypes,
  MapState,
  MapValues,
} from './../types/mapTypes';

export const changeMapValue = (
  prop: keyof MapState,
  value: MapValues,
): ChangeMapValueAction => {
  return {
    type: MapActionTypes.CHANGE_VALUE,
    payload: {
      prop,
      value,
    },
  };
};

export const getCurrentLocation = () => ({
    type: MapActionTypes.GET_CURRENT_LOCATION,
});
