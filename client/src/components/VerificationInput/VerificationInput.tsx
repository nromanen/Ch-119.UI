import React, { FC } from 'react';
import { InputGeneral } from '../InputGeneral';
import { Button, Toast } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { VERIFICATE } from '../../constants/registrationConstants';

const VerificationInput: FC = (props: any) => {
  let showInput = false;
  const code = { code: ''};

  if (props.auth.authError.includes(VERIFICATE)) {
    showInput = true;
  }

  return showInput ? (
    <React.Fragment>
        <Toast
        className="modal verify"
      >
      <Form
        onSubmit={(formObj) => {
          if (formObj.code === props.auth.verification_code) {
            props.verifyCode(formObj);
            props.loginUser(props.auth);
            props.verifyCode(code);
          } else {
            props.handleError({ data: 'Wrong verify code', hasError: true, verification_code: props.auth.verification_code });
          }
        }}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, submitting, pristine}) => (
          <form onSubmit={handleSubmit} className="form-horizontal jumbotron">
            <InputGeneral
              name="code"
              type="text"
              label="Write your verify code:"
              id="code"
            />
            <div className="col-xs-4">
              <Button type="submit" disabled={submitting || pristine}>
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
