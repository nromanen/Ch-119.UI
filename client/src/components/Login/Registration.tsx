import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import { phoneMask, maxValue, carMask, passwordMask } from '../../utils/validators';
import AlertContainer from '../Alert/AlertContainer';
import { REQUIERED_ERROR_MESSAGE, MATCH_PASSWORDS } from '../../constants/errorConstants';
import { NavLink } from 'react-router-dom';

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
            } // } else if (values.phone !== )
            return errors;
          }}
          subscription={{
            submitting: true,
          }}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className="form-horizontal">
              <div className="form-group">
                <Field
                  name="name"
                  placeholder="Your name"
                  validate={maxValue(20)}
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
                      <label className="col-xs-2">Name:</label>
                      <div className="col-xs-4">
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
              <div className="form-group">
                <Field
                  name="phone"
                  placeholder="+380501233314"
                  validate={phoneMask}
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
                      <label className="col-xs-2">Phone number:</label>
                      <div className="col-xs-4">
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
              <div className="form-group">
                <Field
                  name="password"
                  type="password"
                  validate={passwordMask}
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
                      <label className="col-xs-2">Password:</label>
                      <div className="col-xs-4">
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
              <div className="form-group">
                <Field
                  name="confirm"
                  type="password"
                  validate={maxValue(50)}
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
                      <label className="col-xs-2">Repeat password:</label>
                      <div className="col-xs-4">
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
              <div className="col-xs-4 font-weight-bold">
                <label>Registrate as driver</label>
                <input id="driver" type="checkbox" onChange={onChangeHandler} checked={isDriver}/>
              </div>
              {isDriver ? (<React.Fragment>
                <div className="form-group">
              <Field
                  name="car_color"
                  type="text"
                  validate={maxValue(15)}
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
                      <label className="col-xs-2">Car color:</label>
                      <div className="col-xs-4">
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
              <div className="form-group">
              <Field
                  name="car_model"
                  type="text"
                  validate={maxValue(30)}
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
                      <label className="col-xs-2">Car model:</label>
                      <div className="col-xs-4">
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
              <div className="form-group">
              <Field
                  name="car_number"
                  type="text"
                  validate={carMask}
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
                      <label className="col-xs-2">Car number:</label>
                      <div className="col-xs-4">
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
