import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Field, FormSpy } from 'react-final-form';
import { required } from '../../utils/formValidators';

export const Registration = (props: any) => {
  return (
    <div className='jumbotron'>
      <div className='container-fluid'>
        <h1>Registration</h1>
        <Form
          onSubmit={(formObj) => {
            props.registrateUser(formObj);
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.password) {
              errors.password = 'Required';
            }
            if (!values.confirm) {
              errors.confirm = 'Required';
            } else if (values.confirm !== values.password) {
              errors.confirm = 'Must match';
            }
            return errors;
          }}
          subscription={{
            submitting: true,
          }}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className='form-horizontal'>
              <div className='form-group'>
                <Field
                  name='name'
                  placeholder='Your name'
                  // validate={maxLengthCreator(9)}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}
                >
                  {({ input, meta, placeholder }) => (
                    <div>
                      <label className='col-xs-2'>Name:</label>
                      <div className='col-xs-4'>
                        <input {...input} placeholder={placeholder} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
              <div className='form-group'>
                <Field
                  name='phone'
                  placeholder='+380501233314'
                  validate={required}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}
                >
                  {({ input, meta, placeholder }) => (
                    <div>
                      <label className='col-xs-2'>Phone number:</label>
                      <div className='col-xs-4'>
                        <input {...input} placeholder={placeholder} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
              <div className='form-group'>
                <Field
                  name='password'
                  type='password'
                  validate={required}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}
                >
                  {({ input, meta }) => (
                    <div>
                      <label className='col-xs-2'>Password:</label>
                      <div className='col-xs-4'>
                        <input {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
              <div className='form-group'>
                <Field
                  name='confirm'
                  type='password'
                  validate={required}
                  subscription={{
                    value: true,
                    active: true,
                    error: true,
                    touched: true,
                  }}
                >
                  {({ input, meta }) => (
                    <div>
                      <label className='col-xs-2'>Repeat password:</label>
                      <div className='col-xs-4'>
                        <input {...input} />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              </div>
              <div className='col-xs-offset-2 col-xs-10 ml-5'>
                <Button type='submit' disabled={submitting}>
                  Register
                </Button>
              </div>
              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <pre>{JSON.stringify(values, undefined, 2)}</pre>
                )}
              </FormSpy>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
