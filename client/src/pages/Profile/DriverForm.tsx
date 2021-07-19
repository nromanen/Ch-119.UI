import React, { FC } from 'react';
import { Form } from 'react-final-form';
import {
  composeValidators,
  carMask,
  nameMask,
  required,
  maxValue,
} from '../../utils/validators';
import { IProfileForm } from '../../types/userTypes';
import { InputGeneral } from '../../components/InputGeneral';
import {
  MAX_VALUE_FOR_CAR_COLOR,
  MAX_VALUE_FOR_CAR_MODEL,
} from '../../constants/profileConstants';

const ProfileForm: FC<IProfileForm> = ({ driverProfile, logoutUser }) => (
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
            validate={composeValidators(
              required,
              maxValue(MAX_VALUE_FOR_CAR_COLOR),
            )}
            placeholder="Blue"
            label="Car color:"
            id="car_color"
          />
          <InputGeneral
            name="car_model"
            placeholder="Ford"
            validate={composeValidators(
              required,
              maxValue(MAX_VALUE_FOR_CAR_MODEL),
            )}
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
