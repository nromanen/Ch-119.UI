import React, { FC } from 'react';
import { maxValue } from '../../utils/validators';
import { InputGeneral } from '../InputGeneral';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { VERIFICATE } from '../../constants/registrationConstants';

const VerificationInput: FC = (props: any) => {
  let showInput = false;

  if (props.auth?.authError?.includes(VERIFICATE) && !props.auth.verification_code) {
    showInput = true;
  }

  return showInput ? (
    <React.Fragment>
      <Form
        onSubmit={(formObj) => {
          props.verifyCode(formObj);
          props.loginUser(props.auth);
        }}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="form-horizontal">
            <InputGeneral
              name="code"
              type="text"
              placeholder="1111"
              validate={maxValue(4)}
              label="Write your verify code:"
              id="code"
            />
            <div className="col-xs-4">
              <Button type="submit" disabled={submitting}>
                Sign in
              </Button>
            </div>
          </form>
        )}
      </Form>
    </React.Fragment>
  ) : (
    <div></div>
  );
};

export default VerificationInput;
