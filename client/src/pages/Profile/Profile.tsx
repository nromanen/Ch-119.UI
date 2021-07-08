import React, { FC, useState } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import { Button } from 'react-bootstrap';
import { InputGeneral } from '../../components/InputGeneral';
import { Form } from 'react-final-form';
import { phoneMask, carMask, maxValue } from '../../utils/validators';
import AlertContainer from '../../components/Alert/AlertContainer';
import { REQUIERED_ERROR_MESSAGE } from '../../constants/errorConstants';
import { DRIVER_ROLE } from '../../constants/registrationConstants';


const Profile: FC = (props: any) => {
  const [isModified, setIsModified] = useState(false);
  const [isDriver, setIsDriver] = useState(false);

  const onDriverChangeHandler = (e: any) => {
    setIsDriver(e.target.checked);
    props.checkDriverState(e.target.checked);
  };

  const onChangeHandler = (e: any) => {
    setIsModified(e.target.checked);
    props.checkModified(e.target.checked);
  };
  return (
    <div className="dark ">
    <div className="profile">
      <AlertContainer />
      <div className="container profile-info">
        <div>
          <div className="profile-header">
          <h2>Your Profile</h2>
          <label className={`btn edit-btn-${isModified ? 'on' : 'off'}`}>Edit info</label>
            <input
              id="edit"
              type="checkbox"
              onChange={onChangeHandler}
              checked={isModified}
            />
            </div>
          {!props.auth.isModified ? (
            <div className="profile-text">
              <p>
                <strong>Username:</strong> {props.auth.name}
              </p>
              <p>
                <strong>Phone:</strong> {props.auth.phone}
              </p>
              {props.auth.role.includes(DRIVER_ROLE) ? (
                <React.Fragment>
                  <p>
                    <strong>Car color:</strong>{' '}
                    {props.auth.driver_info.car_color}
                  </p>
                  <p>
                    <strong>Car model:</strong>{' '}
                    {props.auth.driver_info.car_model}
                  </p>
                  <p>
                    <strong>Car number:</strong>{' '}
                    {props.auth.driver_info.car_number}
                  </p>
                </React.Fragment>
              ) : null}
            </div>
          ) : (
            <div className="container profile-text">
              <Form
                onSubmit={(formObj) => {
                  props.updateUser(formObj);
                }}
                subscription={{
                  submitting: true,
                }}
                initialValues={{
                  phone: props.auth.phone ? props.auth.phone : '',
                  name: props.auth.name ? props.auth.name : '',
                  car_number: props.auth.driver_info.car_number ? props.auth.driver_info.car_number : '',
                }}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit} className="form-horizontal edit-form">
                    <InputGeneral
                      name="name"
                      type="text"
                      className="input"
                      label="Username:"
                      id="name"
                    />
                    <InputGeneral
                      name="phone"
                      className="input"
                      placeholder="+380501233314"
                      validate={phoneMask}
                      label="Phone:"
                      id="phone"
                    />
                    {props.auth.role.includes(DRIVER_ROLE) ? (
                    <InputGeneral
                      name="car_number"
                      className="input"
                      type="text"
                      validate={carMask}
                      label="Car number:"
                      id="car_number"
                    />): null}
                    <div className="form-group">
                      <div className="col-xs-4">
                        <Button type="submit" className="button button--hovered button--outlined button--border" disabled={submitting}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          )}
          {/* make another className */}
          <div className="col-xs-4 reg-driver">
            {!props.auth.role.includes(DRIVER_ROLE) ? (
              <div>
                <label>Registrate as driver</label>
                <input
                  id="driver"
                  className="cm-toggle"
                  type="checkbox"
                  onChange={onDriverChangeHandler}
                  checked={isDriver}
                />
              {isDriver ? (
                <Form
                onSubmit={async (formObj) => {
                    props.driverProfile(formObj);
                    props.logoutUser();
                }}
                validate={(values) => {
                  const errors: any = {};
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
                  <form onSubmit={handleSubmit} className="form-horizontal driver-form">
                <React.Fragment>
                  <InputGeneral
                    name="car_color"
                    type="text"
                    className="input"
                    validate={maxValue(15)}
                    placeholder="Blue"
                    required
                    label="Car color:"
                    id="car_color"
                  />
                  <InputGeneral
                    name="car_model"
                    type="text"
                    className="input"
                    placeholder="Ford"
                    validate={maxValue(30)}
                    required
                    label="Car model:"
                    id="car_model"
                  />
                  <InputGeneral
                    name="car_number"
                    type="text"
                    className="input"
                    validate={carMask}
                    placeholder="CE7890BT"
                    required
                    label="Car number:"
                    id="car_number"
                  />
                </React.Fragment>
                <div className="col-xs-4 mt-3">
                <Button type="submit" className="button button--hovered button--outlined button--border" disabled={submitting}>
                  Become a driver
                </Button>
              </div>
            </form>
          )}
        </Form>
              ) : null}
          </div>): null}
          </div>
        </div>
      </div>
      <button className="btn btn-danger logout" onClick={props.logoutUser}>
      Log out
      </button>
      <Navbar />
    </div>
    </div>
  );
};

export default Profile;
