import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

const Alert = (props: any) => {
  const [show, setShow] = useState(true);

  const changeError = () => {
    setShow(false), props.handleError({ data: '', hasError: false });
  };

  if (props?.auth?.hasError) {
    return (
      <Toast onClose={changeError} delay={3000} autohide show={show}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>{props?.auth?.authError}</Toast.Body>
      </Toast>
    );
  }
  return <div></div>;
  //   console.log('Alert', props.auth.hasError);
  //   useEffect(() => {
  //         setShow(props?.auth?.hasError)
  //   }, [show])

  //   return (
  //     <Row>
  //       <Col xs={6}>
  //         <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
  //           <Toast.Header></Toast.Header>
  //           <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
  //         </Toast>
  //       </Col>
  //       <Col xs={6}>
  //         <Button onClick={() => setShow(true)}>Show Toast</Button>
  //       </Col>
  //     </Row>
  //   );
};

export default Alert;
