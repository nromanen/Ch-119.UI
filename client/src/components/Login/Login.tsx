import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { REGISTRATION_ROUTE } from '../../constants/routerConstants';
import { required } from '../../utils/validators';
import AlertContainer from '../Alert/AlertContainer';
import './Login.scss';

export const Login: FC = (props: any) =>
  <div className='jumbotron'>
    <div className='container-fluid login'>
    <AlertContainer />
      <h2>Login</h2>
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
                required
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
            <div className='form-group'>
              <Field
                name='password'
                type='password'
                required
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
              <div className='form-group'>
              <div className='col-xs-4 mb-3'>
                  <NavLink className="link-primary" to={REGISTRATION_ROUTE}>Don't have an account? Sign up!</NavLink>
            </div>
                <div className='col-xs-4'>
                  <Button type='submit' disabled={submitting}>
                    Sign in
                  </Button>
                </div>
                </div>
          </form>
        )}
      </Form>
    </div>
  </div>;

