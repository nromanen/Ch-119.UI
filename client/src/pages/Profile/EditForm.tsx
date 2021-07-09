import React, { FC } from 'react';
import { Form } from 'react-final-form';
import { phoneMask, carMask, nameMask } from '../../utils/validators';
import { IEditForm } from '../../types/userTypes';
import { InputGeneral } from '../../components/InputGeneral';
import { DRIVER_ROLE } from '../../constants/registrationConstants';

const EditForm: FC<IEditForm> = ({
  phone,
  name,
  car_number,
  role,
  updateUser,
}) => (
  <div className="profile-text">
    <Form
      onSubmit={(formObj) => {
        updateUser(formObj);
      }}
      subscription={{
        submitting: true,
      }}
      initialValues={{
        phone: phone ? phone : '',
        name: name ? name : '',
        car_number: car_number ? car_number : '',
      }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="form-horizontal edit-form">
          <InputGeneral
            name="name"
            validate={nameMask(20)}
            className="input"
            label="Username:"
            id="name"
          />
          <InputGeneral
            name="phone"
            placeholder="+380501233314"
            validate={phoneMask}
            label="Phone:"
            id="phone"
          />
          {role.includes(DRIVER_ROLE) ? (
            <InputGeneral
              name="car_number"
              validate={carMask}
              label="Car number:"
              id="car_number"
            />
          ) : null}
          <div className="form-group">
            <div className="col-xs-4">
              <button
                type="submit"
                className="button button--hovered button--outlined button--border"
                disabled={submitting}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    />
  </div>
);

export default EditForm;
