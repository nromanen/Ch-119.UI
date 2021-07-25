import React, { FC, useState } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';
import AlertContainer from '../../components/Alert/AlertContainer';
import { DRIVER_ROLE } from '../../constants/registrationConstants';
import EditForm from './EditForm';
import DriverForm from './DriverForm';

const Profile: FC = (props: any) => {
  const {
    checkDriverState,
    checkModified,
    auth,
    updateUser,
    driverProfile,
    logoutUser,
  } = props;
  const [isModified, setIsModified] = useState(false);
  const [isDriver, setIsDriver] = useState(false);

  const onDriverChangeHandler = (e: any) => {
    setIsDriver(e.target.checked);
    checkDriverState(e.target.checked);
  };

  const onChangeHandler = (e: any) => {
    setIsModified(e.target.checked);
    checkModified(e.target.checked);
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
            {!auth.isModified ? (
              <div className="profile-text">
                <p>
                  <strong>Username:</strong> {auth.name}
                </p>
                <p>
                  <strong>Phone:</strong> {auth.phone}
                </p>
                {auth.role.includes(DRIVER_ROLE) ? (
                  <React.Fragment>
                    <p>
                      <strong>Car color:</strong> {auth.driver_info.car_color}
                    </p>
                    <p>
                      <strong>Car model:</strong> {auth.driver_info.car_model}
                    </p>
                    <p>
                      <strong>Car number:</strong> {auth.driver_info.car_number}
                    </p>
                  </React.Fragment>
                ) : null}
              </div>
            ) : (
              <EditForm
                name={auth.name}
                phone={auth.phone}
                car_number={auth.driver_info.car_number}
                role={auth.role}
                updateUser={updateUser}
              />
            )}
            <div className="col-xs-4 reg-driver">
              {!auth.role.includes(DRIVER_ROLE) ? (
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
                      driverProfile={driverProfile}
                      logoutUser={logoutUser}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <button className="btn btn-danger logout" onClick={logoutUser}>
          Log out
        </button>
        <Navbar />
      </div>
    </div>
  );
};

export default Profile;
