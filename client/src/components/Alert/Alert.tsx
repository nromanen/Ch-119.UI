import React, { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import { VERIFICATE } from '../../constants/registrationConstants';
import './Alert.scss';

const Alert: FC = (props: any) => {
  const changeError = () => {
    if (props.auth.authError?.includes(VERIFICATE)) {
      props.handleError({ data: props.auth.authError, hasError: false });
    } else {
      props.handleError({ data: '', hasError: false });
    }
  };

    return props?.auth?.hasError ? (
      <Toast
        className="modal"
        onClose={changeError}
        delay={3000}
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
