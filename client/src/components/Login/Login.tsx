import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { REGISTRATION_ROUTE } from '../../utils/consts';

export const Login: FC = () => {
  return (
    <div className='jumbotron'>
      <div className='container-fluid'>
        <h1>Login Form</h1>
        <Form
          onSubmit={(formObj) => {
            console.log(formObj);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='form-horizontal'>
              <div className='form-group'>
                <label className='col-xs-2' htmlFor='phone'>
                  Phone number:
                </label>
                <div className='col-xs-4'>
                  <Field name='phone'>
                    {({ input, meta }) => (
                      <input
                        type='phone'
                        id='phone'
                        placeholder='+380501233314'
                        {...input}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-xs-2' htmlFor='password'>
                  Password:
                </label>
                <div className='col-xs-4'>
                  <Field name='password'>
                    {({ input }) => (
                      <input type='password' id='password' {...input} />
                    )}
                  </Field>
                </div>
              </div>

              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-xs-offset-2 col-xs-10'>
                    <Button type='submit'>Login</Button>
                  </div>
                  <div className='col-xs-offset-2 col-xs-10 ml-5'>
                    <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
