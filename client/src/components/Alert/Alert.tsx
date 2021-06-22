import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import './Alert.scss';

const Alert = (props: any) => {
  const changeError = () => {
  props.handleError({data: '', hasError: false});
  };

  if (props?.auth?.hasError) {
    return (
      <Toast onClose={changeError} delay={3000} autohide show={props.hasError}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>{props?.auth?.authError}</Toast.Body>
      </Toast>
    );
  }
  return <div></div>;
};

export default Alert;
