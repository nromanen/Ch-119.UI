import React, { FC } from 'react';
import { Field } from 'react-final-form';
import { InputGeneralI } from '../types/userTypes';

export const InputGeneral: FC<InputGeneralI> = ({
  type,
  name,
  placeholder,
  className,
  validate,
  required,
  label,
  id,
}) =>
    <div className="form-group">
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        validate={validate}
        required={required}
      >
        {({ input, meta, placeholder }) => (
          <div>
            <label htmlFor={id} className="col-xs-2">{label}</label>
            <div className="col-xs-4">
              <input id={id} {...input} className={className} placeholder={placeholder} />
              <div className="validate_warning">
                {meta.error && meta.touched && (
                  <div className="alert alert-warning">
                    {meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Field>
    </div>;
