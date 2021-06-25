/* eslint-disable operator-linebreak */
import {
  REQUIERED_ERROR_MESSAGE,
  MAX_VALUE_ERROR_MESSAGE,
  MATCH_PASSWORDS,
  WRONG_PHONE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  WRONG_CAR_NUMBER,
} from '../constants/errorConstants';
import {
  PASS_MAX_LENGTH,
  PASS_MIN_LENGTH,
  PHONE_LENGTH,
} from '../constants/registrationConstants';

export const required = (value: any) =>
  value ? undefined : REQUIERED_ERROR_MESSAGE;

export const maxValue = (max: any) => (value: any) =>
  !value || value?.length <= max
    ? undefined
    : `${MAX_VALUE_ERROR_MESSAGE} ${max}`;

export const confirmPassword = (value: any) => {
  if (value.confirm !== value.password) return MATCH_PASSWORDS;
};

export const passwordMask = (value: any) => {
  if (!value || value.length < PASS_MIN_LENGTH) return PASSWORD_MIN_LENGTH;
  if (!value || value?.length >= PASS_MAX_LENGTH) return PASSWORD_MAX_LENGTH;
};

export const phoneMask = (value: any) => {
  if (!value?.includes('+380')) return WRONG_PHONE;
  if (value.length < PHONE_LENGTH) return WRONG_PHONE;
};

export const carMask = (value: any) => {
  // RegExp = array with 2 letters 4 digits and 2 letters (RegExp.test(value)) = true/false
  if (!value?.includes('CE')) {
    return WRONG_CAR_NUMBER;
  }
};


