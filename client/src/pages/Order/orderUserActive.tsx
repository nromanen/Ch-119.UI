import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {
  faMapMarkerAlt,
  faArrowAltCircleRight,
  faHryvnia,
  faInfoCircle,
  faPhone,
  faTaxi,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'reactstrap';
import { ColInfo } from '../../components/colInfo';
import { useTypedSelector } from './../../hooks/useTypedSelector';

/**
 * @return {Object}
 */
const OrderUserActive = ({ match }: any) => {
  console.log(match, 'match');
  const [order, setOrder]: any = useState<any[]>([]);
  const { car_types } = useTypedSelector((state) => state.cityInfo);
  // const accepted = useSelector(state => state.orderList.accepted)
  useEffect(() => {
    fetchOrderById();
  }, []);

  const fetchOrderById = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}order/${match.params.id}`,
    );

    console.log(data);
    setOrder(data.data.data);
  };

  const carType = car_types.find((type) => type.id === order.carTypeId);

  return (
    <div className="jumbotron">
      <div>
        <div className="taxi-img animation">
          <p>driver is on the way</p>
        </div>
        <div className="box">
          <Container>
            <Row>
              <ColInfo xs="col-6" icon={faMapMarkerAlt} order={order.from} />
              <ColInfo
                icon={faPhone}
                order={<a href="tel:+38 099 123 45 67">099 123 45 67</a>}
              />
            </Row>

            <Row>
              <ColInfo
                xs="col-6"
                icon={faArrowAltCircleRight}
                order={order.to}
              />
              <ColInfo icon={faInfoCircle} order={order.extra_services} />
            </Row>

            <Row>
              <ColInfo
                xs="col-6"
                icon={faHryvnia}
                order={<strong>{order.price}</strong>}
              />
              {/* <ColInfo
                icon={faStar}
                order={<span>{order.info} 4.3 Ivan</span>}
              /> */}
            </Row>

            {carType && (
              <Row>
                <ColInfo xs="col-6" icon={faTaxi} order={carType.name} />
              </Row>
            )}

            <div className="btn-space">
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

export default OrderUserActive;
