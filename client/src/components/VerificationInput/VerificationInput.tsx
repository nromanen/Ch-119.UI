import React, { FC } from 'react';
import { required } from '../../utils/validators';
import { InputGeneral } from '../InputGeneral';
import { Button, Toast } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { VERIFICATE } from '../../constants/registrationConstants';

const VerificationInput: FC = (props: any) => {
  let showInput = false;
  const code = { code: ''};

  if (props.auth?.authError?.includes(VERIFICATE) && !props.auth.verification_code) {
    showInput = true;
  }

  return showInput ? (
    <React.Fragment>
        <Toast
        className="modal"
      >
      <Form
        onSubmit={(formObj) => {
          if (formObj.code === props.splitError(props.auth?.authError)) {
            props.verifyCode(formObj);
            props.loginUser(props.auth);
            props.verifyCode(code);
          }
          props.handleError({ data: 'Wrong verify code', hasError: true});
        }}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className="form-horizontal jumbotron">
            <InputGeneral
              name="code"
              type="text"
              validate={required}
              label="Write your verify code:"
              id="code"
              required
            />
            <div className="col-xs-4">
              <Button type="submit" disabled={submitting}>
                Verify
              </Button>
            </div>
          </form>
        )}
      </Form>
      </Toast>
    </React.Fragment>
  ) : (
    <div></div>
  );
};

export default VerificationInput;
