import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-final-form';
import { REGISTRATION_ROUTE } from '../../constants/routerConstants';
import { required } from '../../utils/validators';
import AlertContainer from '../Alert/AlertContainer';
import VerificationCodeContainer from '../VerificationInput/VerificationInputContainer';
import './Login.scss';
import { InputGeneral } from '../InputGeneral';

export const Login: FC = (props: any) => (
  <div>
    <VerificationCodeContainer />
    <AlertContainer />
    <div className={`jumbotron login`}>
      <div
        className={`container-fluid login`}
      >
        <h2>Login</h2>
        <Form
          onSubmit={(formObj) => {
            props.loginUser(formObj);
          }}
          subscription={{
            submitting: true,
          }}
          initialValues={{
            phone: props.auth.phone ? props.auth.phone : '',
            password: props.auth.password ? props.auth.password : '',
          }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
              <InputGeneral
                name="phone"
                placeholder="+380501233314"
                validate={required}
                label="Phone number:"
                id="phone"
              />
              <InputGeneral
                name="password"
                type="password"
                validate={required}
                label="Password:"
                id="password"
              />
              <div className="form-group">
                <div className="col-xs-4 mb-3">
                  <NavLink className="link-primary" to={REGISTRATION_ROUTE}>
                    Don't have an account? Sign up!
                  </NavLink>
                </div>
                <div className="col-xs-4">
                  <Button type="submit" disabled={submitting || props.auth.verification_code}>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  </div>
);
