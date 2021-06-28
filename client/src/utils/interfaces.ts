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

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  rpassword: string;
}

export interface ParamTypes {
  orderId: string;
}

export interface FeedbackFormI {
  text: string;
  rating: number;
  author_id: number;
  subject_id: number;
  orderId: number;
}


export interface FormLabelI {
  title?: string | false;
  htmlFor?: string;
  classNames?: string[];
}
