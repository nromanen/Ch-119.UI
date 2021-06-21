import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { REGISTRATION_ROUTE } from '../../constants/routerConstants';
import { required } from '../../utils/formValidators';

export const Login: FC = (props: any) =>
  <div className='jumbotron'>
    <div className='container-fluid'>
      <h1>Login</h1>
      <Form
        onSubmit={(formObj) => {
          props.loginUser(formObj);
        }}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className='form-horizontal'>
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
                      {meta.error && meta.touched && <span>{meta.error}</span>}
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
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  </div>
                )}
              </Field>
            </div>
              <div className='form-group'>
              <div className='col-xs-4 mb-3'>
                  <NavLink className="link-primary" to={REGISTRATION_ROUTE}>Don't have an account?</NavLink>
            </div>
                <div className='col-xs-4'>
                  <Button type='submit' disabled={submitting}>
                    Login
                  </Button>
                </div>
                </div>
          </form>
        )}
      </Form>
    </div>
  </div>;

