import React, { FC } from 'react';
import { Form } from 'react-final-form';
import { maxValue, carMask, nameMask } from '../../utils/validators';
import { IProfileForm } from '../../types/userTypes';
import { InputGeneral } from '../../components/InputGeneral';

const ProfileForm: FC<IProfileForm> = ({
  driverProfile,
  logoutUser,
}) => (
  <Form
    onSubmit={(formObj) => {
      driverProfile(formObj);
      logoutUser();
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
        <div className="col-xs-4">
          <button
            type="submit"
            className="button button--hovered button--outlined button--border"
            disabled={submitting}
          >
            Become a driver
          </button>
        </div>
      </form>
    )}
  </Form>
);

export default ProfileForm;
