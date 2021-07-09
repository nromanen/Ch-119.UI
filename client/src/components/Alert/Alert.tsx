import React, { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import { VERIFICATE, ALERT_DELAY } from '../../constants/registrationConstants';
import './Alert.scss';

const Alert: FC = (props: any) => {
  const clearError = () => {
    if (props.auth.authError?.includes(VERIFICATE)) {
      props.handleError({
        data: props.auth.authError,
        hasError: false,
        verification_code: props.auth.verification_code,
      });
    } else {
      props.handleError({
        data: '',
        hasError: false,
        verification_code: props.auth.verification_code,
      });
    }
  };

  return props?.auth?.hasError ? (
    <Toast
      className="modal alert-error"
      onClose={clearError}
      delay={ALERT_DELAY}
      autohide
      show={props.hasError}
    >
      <Toast.Header>
        <strong className="mr-auto">Error!</strong>
      </Toast.Header>
      <Toast.Body>{props?.auth?.authError}</Toast.Body>
    </Toast>
  ) : (
    <div></div>
  );
};

export default Alert;
