import React, { FC, useState } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import { InputGeneral } from '../../components/InputGeneral';
import { Form } from 'react-final-form';
import {
  phoneMask,
  carMask,
  maxValueWithRequired,
  nameMask,
} from '../../utils/validators';
import AlertContainer from '../../components/Alert/AlertContainer';
import { REQUIERED_ERROR_MESSAGE } from '../../constants/errorConstants';
import { DRIVER_ROLE } from '../../constants/registrationConstants';
import EditForm from './EditForm';
import DriverForm from './DriverForm';

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
              <label className={`btn edit-btn-${isModified ? 'on' : 'off'}`}>
                Edit info
              </label>
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
              <EditForm
                name={props.auth.name}
                phone={props.auth.phone}
                car_number={props.auth.driver_info.car_number}
                role={props.auth.role}
                updateUser={props.updateUser}
              />
            )}
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
                    <DriverForm
                      driverProfile={props.driverProfile}
                      logoutUser={props.logoutUser}
                    />
                  ) : null}
                </div>
              ) : null}
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
