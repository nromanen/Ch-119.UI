import { REQUIRED, MATCH_PASSWORDS } from '../constants/validatorsConstants';

export const required = (value: string) => (value ? undefined : REQUIRED);

export const confirmPassword = (value: any) => {
  if (value.confirm !== value.password) return MATCH_PASSWORDS;
};
