export const required = (value: any) => (value ? undefined : 'Required');

export const maxValue = (max: any) => (value: any) =>
  !value || value?.length <= max ? undefined : `Max length is ${max} symbols`;
