import React, { FC, useState } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import { Button } from 'react-bootstrap';
import { InputGeneral } from '../../components/InputGeneral';
import { Form } from 'react-final-form';
import { phoneMask, carMask } from '../../utils/validators';
import AlertContainer from '../../components/Alert/AlertContainer';

const Profile: FC = (props: any) => {
  const [isModified, setIsModified] = useState(false);

  const onChangeHandler = (e: any) => {
    setIsModified(e.target.checked);
    props.checkModified(e.target.checked);
  };
  return (
    <div className="jumbotron profile">
      <AlertContainer />
      <div className="profile-info">
        <div>
          <h2>User Profile</h2>
          {!props.auth.isModified ? (
            <div className="container profile-text">
              <p>
                <strong>Username:</strong> {props.auth.name}
              </p>
              <p>
                <strong>Phone:</strong> {props.auth.phone}
              </p>
              {props.auth.isDriver ? (
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
                  <form onSubmit={handleSubmit} className="form-horizontal">
                    <InputGeneral
                      name="name"
                      type="text"
                      label="Your name:"
                      id="name"
                    />
                    <InputGeneral
                      name="phone"
                      placeholder="+380501233314"
                      validate={phoneMask}
                      label="Your phone number:"
                      id="phone"
                    />
                    {props.auth.isDriver ? (
                    <InputGeneral
                      name="car_number"
                      type="text"
                      validate={carMask}
                      label="Your car number:"
                      id="car_number"
                    />): null}
                    <div className="form-group">
                      <div className="col-xs-4">
                        <Button type="submit" disabled={submitting}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              />
            </div>
          )}
          <div className="col-xs-4 font-weight-bold bg-white">
            <button className="btn btn-danger" onClick={props.logoutUser}>
              Log out
            </button>
            <label>Edit</label>
            <input
              id="driver"
              type="checkbox"
              onChange={onChangeHandler}
              checked={isModified}
            />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
