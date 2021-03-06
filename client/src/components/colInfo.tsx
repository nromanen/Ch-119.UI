import React from 'react';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ColInfo = (props: any) =>
    <Col className={props.xs}>
      <p><FontAwesomeIcon icon={props.icon} className={props.className} /> {props.order}</p>
    </Col>;
