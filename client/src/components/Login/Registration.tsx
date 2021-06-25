import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { phoneMask, maxValue, carMask, passwordMask } from '../../utils/validators';
import AlertContainer from '../Alert/AlertContainer';
import { REQUIERED_ERROR_MESSAGE, MATCH_PASSWORDS } from '../../constants/errorConstants';
import { NavLink } from 'react-router-dom';
import './Login.scss';
import { InputLog } from '../InputGeneral';

export const Registration: FC = (props: any) => {
  const [isDriver, setIsDriver] = useState(false);

  const onChangeHandler = (e: any) => {
    setIsDriver(e.target.checked);
    props.checkDriverState(e.target.checked);
  };

  return (
    <div className="jumbotron">
      <div className="container-fluid registration">
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
          validate={(values) => {
            const errors: any = {};
            if (!values.password) {
              errors.password = REQUIERED_ERROR_MESSAGE;
            }
            if (!values.confirm) {
              errors.confirm = REQUIERED_ERROR_MESSAGE;
            } else if (values.confirm !== values.password) {
              errors.confirm = MATCH_PASSWORDS;
            }
            if (!values.car_color) {
              errors.car_color = REQUIERED_ERROR_MESSAGE;
            }
            if (!values.car_model) {
              errors.car_model = REQUIERED_ERROR_MESSAGE;
            }
            if (!values.car_number) {
              errors.car_number = REQUIERED_ERROR_MESSAGE;
            }
            return errors;
          }}
          subscription={{
            submitting: true,
          }}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
            <InputLog
            name='name'
            type='text'
            placeholder="Your name"
            validate={maxValue(20)}
            label='Your name:'
            />
            <InputLog
            name='phone'
            type='text'
            placeholder="+380501233314"
            validate={phoneMask}
            label='Phone number:'
            />
            <InputLog
            name='password'
            type='password'
            validate={passwordMask}
            label='Password:'
            />
            <InputLog
            name='confirm'
            type='password'
            validate={maxValue(25)}
            required
            label='Confirm password:'
            />
            <div className="col-xs-4 font-weight-bold">
              <label>Registrate as driver</label>
              <input id="driver" type="checkbox" onChange={onChangeHandler} checked={isDriver}/>
            </div>
              {isDriver ? (<React.Fragment>
                <InputLog
                name='car_color'
                type='text'
                validate={maxValue(15)}
                placeholder="Blue"
                required
                label='Car color:'
                />
                <InputLog
                name='car_model'
                type='text'
                placeholder="Ford"
                validate={maxValue(30)}
                required
                label='Car model:'
                />
                <InputLog
                name='car_number'
                type='text'
                validate={carMask}
                placeholder="CE7890BT"
                required
                label='Car number:'
                />
              </React.Fragment>): null}
              <div className="col-xs-4 mt-3">
                <Button type="submit" disabled={submitting}>
                  Sign up
                </Button>
                <div className="btn btn-primary login-btn">
                <NavLink to="/">
                  Sign in
                </NavLink>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
