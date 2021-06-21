import React, { FormEvent, FC } from 'react';

interface InputI {
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  value: string;
  className: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
}
export const Input: FC<InputI> = ({
  onChange,
  value,
  className,
  type,
  name,
  id,
  placeholder,
}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className={className}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
    />
  );
};
