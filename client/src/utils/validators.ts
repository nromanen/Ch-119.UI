/* eslint-disable operator-linebreak */
import {
  REQUIERED_ERROR_MESSAGE,
  MAX_VALUE_ERROR_MESSAGE,
  MATCH_PASSWORDS,
  WRONG_PHONE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  WRONG_CAR_NUMBER,
  CORRECT_NAME,
} from '../constants/errorConstants';
import {
  PASS_MAX_LENGTH,
  PASS_MIN_LENGTH,
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

export const nameMask = (max: any) => (value: any) => {
  if (value?.length >= max) {
    return `${MAX_VALUE_ERROR_MESSAGE} ${max}`;
  }
  if (!RegExp('^[A-Za-z \u0400-\u04FF0-9]*$').test(value)) {
    return CORRECT_NAME;
  }
};

export const passwordMask = (value: any) => {
  if (!value || value.length < PASS_MIN_LENGTH) return PASSWORD_MIN_LENGTH;
  if (!value || value?.length >= PASS_MAX_LENGTH) return PASSWORD_MAX_LENGTH;
};

export const phoneMask = (value: any) => {
  if (!RegExp('^\\+380[0-9]{9}$').test(value)) {
    return WRONG_PHONE;
  }
};

export const carMask = (value: any) => {
  const val = value?.toUpperCase();
  if (!RegExp('^[ABCEHIKMOPTX]{2}[0-9]{4}[ABCEHIKMOPTX]{2}$').test(val)) {
    return WRONG_CAR_NUMBER;
  }
};
