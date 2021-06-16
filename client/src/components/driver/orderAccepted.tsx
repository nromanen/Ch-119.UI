import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faArrowAltCircleRight, faHryvnia, faInfoCircle, faPhone} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';

/**
 * @return {Object}
 */
const OrderAccepted = ({match}: any) => {
  console.log(match);
  const [order, setOrder]: any = useState<any[]>([]);
  // const accepted = useSelector(state => state.orderList.accepted)
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await axios.get(`${process.env.REACT_APP_HOST}order/${match.params.id}`);

    console.log(data);
    setOrder(data.data.data);
  };

  return (
    <div className="jumbotron">
      <div>
      <h2 className="text-center">Order is accepted.</h2>
      <div className="box">
        <Container>
          <Row>
            <Col>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {order.from}</p>
            </Col>
          </Row>
          <Row>
            <Col>
            <p><FontAwesomeIcon icon={faArrowAltCircleRight} /> {order.to}</p>
            </Col>
          </Row>
          <Row>
            <Col>
            <p><strong><FontAwesomeIcon icon={faHryvnia} /> {order.price}</strong></p>
            </Col>
          </Row>
          <Row>
            <Col>
            <p><FontAwesomeIcon icon={faPhone} /></p>
            </Col>
          </Row>
          <Row>
            <Col>
            <p>Extra services: {order.extra_services}</p>
            </Col>
          </Row>
          <div className="btn-space">
        <Link to={'#'}>
          <Button variant="success">Start</Button>
        </Link>
        <Link to={'#'}>
          <Button variant="danger">Cancel</Button>
        </Link>
        {/* <Link to={'#'}>
          <Button variant="warning">Waiting</Button>
        </Link> */}
        </div>
        </Container>
      </div>
      </div>
    </div>
  );
};

export default OrderAccepted;
