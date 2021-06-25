import React, { FC } from 'react';
import { Field } from 'react-final-form';

interface InputLogI {
    className?: string;
    type?: string;
    name: string;
    placeholder?: string;
    validate: any;
    required?: any;
    label: string;
  }

export const InputLog: FC<InputLogI> = ({
    type,
    name,
    placeholder,
    validate,
    required,
    label,
}) => {
    return (
        <div className='form-group'>
              <Field
                name={name}
                type={type}
                placeholder={placeholder}
                validate={validate}
                required={required}
              >
                {({ input, meta, placeholder }) => (
                  <div>
                    <label className='col-xs-2'>{label}</label>
                    <div className='col-xs-4'>
                      <input {...input} placeholder={placeholder} />
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
            </div>
    );
};

