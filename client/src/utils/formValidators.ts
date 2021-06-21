export const required = (value: string) => (value ? undefined : 'Required');

export const maxLengthCreator = (maxLength: number) => (value: string) =>
  value?.length > maxLength ? undefined : `Max lenght is ${maxLength} symbols`;

export const minLengthCreator = (minLength: number) => (value: string) =>
  value?.length < minLength ? undefined : `Min lenght is ${minLength} symbols`;

export const confirmPassword = (value: any) => {
  if (value.confirm !== value.password) return 'Passwords must match';
};
