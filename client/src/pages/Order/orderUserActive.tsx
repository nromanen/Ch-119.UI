import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from '../../components/Navbar/Navbar';
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

const OrderUserActive = ({ match }: any) => {
  const [order, setOrder]: any = useState<any[]>([]);
  const { car_types } = useTypedSelector((state) => state.cityInfo);
  useEffect(() => {
    fetchOrderById();
  }, []);

  const fetchOrderById = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}order/${match.params.id}`,
    );
    setOrder(data.data.data);
  };

  const carType = car_types.find((type: any) => type.id === order.carTypeId);
  const { extra_services } = useTypedSelector((state) => state.cityInfo);
  const extraServices = order?.extra_services?.map((id: number) => {
    const extServItem = extra_services.find((extServ) => extServ.id === id);
    return extServItem?.name;
  }) || [];

  return (
    <div className="jumbotron order-user-active">
      <div>
        <div className="overflow">
          <div className="taxi-img animation">
            <p>driver is on the way</p>
          </div>
        </div>
        <div className="box">
          <Container>
            <Row>
              <ColInfo xs="col-6" icon={faMapMarkerAlt} order={order.from} />
              <ColInfo icon={faPhone} order={<a href={'tel:' + order.user?.phone}>{order.user?.phone}</a>} />
            </Row>

            <Row>
              <ColInfo
                xs="col-6"
                icon={faArrowAltCircleRight}
                order={order.to}
              />
              <ColInfo icon={faInfoCircle} order={extraServices.join(', ').toLowerCase()} />
            </Row>

            <Row>
              <ColInfo
                xs="col-6"
                icon={faHryvnia}
                order={<strong>{order.price}</strong>}
              />
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
        <Navbar />
      </div>
    </div>
  );
};

export default OrderUserActive;
