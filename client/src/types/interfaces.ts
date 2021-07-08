import { FormEvent } from 'react';

export interface InputI {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  value: string;
  className: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
}

export interface ButtonPropsI {
  onClick?: () => {};
  className?: string;
  disabled?: boolean;
  type?: string;
  label?: string;
  variant?: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  rpassword: string;
}

export interface FormLabelI {
  title?: string | false;
  htmlFor?: string;
  classNames?: string[];
}
