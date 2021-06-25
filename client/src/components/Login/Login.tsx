import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-final-form';
import { REGISTRATION_ROUTE } from '../../constants/routerConstants';
import { required } from '../../utils/validators';
import AlertContainer from '../Alert/AlertContainer';
import './Login.scss';
import { InputLog } from '../InputGeneral';

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
            <InputLog
            name='phone'
            placeholder='+380501233314'
            validate={required}
            label='Phone number:'
            />
            <InputLog
            name='password'
            type='password'
            validate={required}
            label='Password:'
            />
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

