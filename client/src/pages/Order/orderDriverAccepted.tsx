import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { faMapMarkerAlt, faArrowAltCircleRight, faHryvnia, faInfoCircle, faPhone, faTaxi, faStar } from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'reactstrap';
import { ColInfo } from '../../components/colInfo';
import { useTypedSelector } from './../../hooks/useTypedSelector';

/**
 * @return {Object}
 */
const OrderDriverAccepted = ({ match }: any) => {
  console.log(match);
  const [order, setOrder]: any = useState<any[]>([]);
  const { car_types } = useTypedSelector((state) => state.cityInfo);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}order/${match.params.id}`);

    console.log(data);
    setOrder(data.data.data);
  };

  const carType = car_types.find((type) => type.id === order.carTypeId);

  return (
    <div className="jumbotron">
      <div>
        <div className="overflow">
          <div className="walk-img animation">
            <p>passenger is waiting</p>
            </div>
        </div>
        <div className="box">
          <Container>
            <Row>
              <ColInfo xs="col-6" icon={faMapMarkerAlt} order={order.from} />
              <ColInfo icon={faPhone} order={<a href="tel:+38 099 123 45 67">099 123 45 67</a>} />
            </Row>

            <Row>
              <ColInfo xs="col-6" icon={faArrowAltCircleRight} order={order.to} />
              <ColInfo icon={faInfoCircle} order={order.extra_services} />
            </Row>

            <Row>
              <ColInfo xs="col-6" icon={faHryvnia} order={<strong>{order.price}</strong>} />
              <ColInfo icon={faStar} order={<span>{order.info} 4.5 Oleg</span>} />
            </Row>

            {carType && (
              <Row>
                <ColInfo xs="col-6" icon={faTaxi} order={carType.name} />
              </Row>
            )}

            <div className="btn-space">
              <Link to={'#'}>
                <Button variant="success">Start</Button>
              </Link>
              <Link to={'#'}>
                <Button variant="primary">Finish</Button>
              </Link>
              <Link to={'#'}>
                <Button variant="danger">Cancel</Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default OrderDriverAccepted;
