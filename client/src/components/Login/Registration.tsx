import React, { FC, useState } from 'react';
import { Form } from 'react-final-form';
import {
  phoneMask,
  maxValue,
  carMask,
  passwordMask,
  nameMask,
} from '../../utils/validators';
import AlertContainer from '../Alert/AlertContainer';
import { NavLink } from 'react-router-dom';
import './Login.scss';
import { InputGeneral } from '../InputGeneral';
import VerificationCodeContainer from '../VerificationInput/VerificationInputContainer';

export const Registration: FC = (props: any) => {
  const [isDriver, setIsDriver] = useState(false);

  const onChangeHandler = (e: any) => {
    setIsDriver(e.target.checked);
    props.checkDriverState(e.target.checked);
  };

  return (
    <div className="dark registration">
      <div className="container-fluid registration">
        <VerificationCodeContainer />
        <AlertContainer />
        <h2>Registration</h2>
        <Form
          onSubmit={(formObj) => {
            if (!isDriver) {
              props.registrateUser(formObj);
            } else {
              props.registrateDriver(formObj);
            }
          }}
          subscription={{
            submitting: true,
          }}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
              <InputGeneral
                name="name"
                validate={nameMask(20)}
                label="Your name:"
                id="name"
              />
              <InputGeneral
                name="phone"
                placeholder="+380501233314"
                validate={phoneMask}
                label="Phone number:"
                id="phone"
              />
              <InputGeneral
                name="password"
                type="password"
                validate={passwordMask}
                label="Password:"
                id="password"
              />
              <InputGeneral
                name="confirm"
                type="password"
                validate={maxValue(25)}
                required
                label="Confirm password:"
                id="confirm"
              />
              <div className="col-xs-4 font-weight-bold">
                <label>Registrate as driver</label>
                <input
                  id="driver"
                  className="cm-toggle"
                  type="checkbox"
                  onChange={onChangeHandler}
                  checked={isDriver}
                />
              </div>
              {isDriver ? (
                <React.Fragment>
                  <InputGeneral
                    name="car_color"
                    validate={maxValue(15)}
                    placeholder="Blue"
                    label="Car color:"
                    id="car_color"
                  />
                  <InputGeneral
                    name="car_model"
                    placeholder="Ford"
                    validate={maxValue(30)}
                    label="Car model:"
                    id="car_model"
                  />
                  <InputGeneral
                    name="car_number"
                    validate={carMask}
                    placeholder="CE7890BT"
                    label="Car number:"
                    id="car_number"
                  />
                </React.Fragment>
              ) : null}
              <div className="col-xs-4 mt-3">
                <button
                  type="submit"
                  className="button button--hovered button--outlined button--border"
                  disabled={submitting || props.auth.verification_code}
                  >
                  Sign up
                </button>
                <NavLink className="login-link" to="/">
                  Sign in
                </NavLink>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
