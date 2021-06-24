/* eslint-disable operator-linebreak */
import {
  REQUIERED_ERROR_MESSAGE,
  MAX_VALUE_ERROR_MESSAGE,
  MATCH_PASSWORDS,
  WRONG_PHONE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../constants/errorConstants';
import { PASS_MAX_LENGTH, PASS_MIN_LENGTH } from '../constants/registrationConstants';

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
  const passMinLength = PASS_MIN_LENGTH;
  const passMaxLength = PASS_MAX_LENGTH;
      if (!value || value?.length >= passMaxLength) return PASSWORD_MAX_LENGTH;
      if (!value || value.length < passMinLength) return PASSWORD_MIN_LENGTH;
};

export const phoneMask = (value: any) => {
  const phoneLength = 13;
  if (!value?.includes('+380')) return WRONG_PHONE;
  if (value.length < phoneLength) return WRONG_PHONE;
};

export const carMask = (value: string) => {
  if (!value?.includes('CE'+value+'')) {
    return WRONG_PHONE;
  }
};
