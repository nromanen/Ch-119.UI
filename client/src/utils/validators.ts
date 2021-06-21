/* eslint-disable operator-linebreak */
import {
  REQUIERED_ERROR_MESSAGE,
  MAX_VALUE_ERROR_MESSAGE,
} from '../constants/errorConstants';

export const required = (value: any) =>
  value ? undefined : REQUIERED_ERROR_MESSAGE;

export const maxValue = (max: any) => (value: any) =>
  !value || value?.length <= max
    ? undefined
    : `${MAX_VALUE_ERROR_MESSAGE} ${max}`;
