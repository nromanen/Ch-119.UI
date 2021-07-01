import axios from 'axios';
import { Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faArrowAltCircleRight,
  faHryvnia,
  faInfoCircle,
  faTaxi,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';
import { ColInfo } from './ColInfo';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import jwt_decode from 'jwt-decode';
import store from '../../reduxStore';

const OrderItem = ({ order }: any) => {
  const orderId = order.id;
  const changeStatus = async (
    orderId: number | string,
    driverId: number | string,
  ) => {
    console.log(driverId);
    await axios.put(`${process.env.REACT_APP_SERVER_URL}order/${orderId}`, {
      body: {
        id: `${orderId}`,
        status: 'accepted',
        customer_id: 3,
      },
    });
  };

  const { car_types } = useTypedSelector((state) => state.cityInfo);
  const carType = car_types.find((type) => type.id === order.carTypeId);

  const { extra_services } = useTypedSelector((state) => state.cityInfo);
  const extraServices =
    order.extra_services.map((id: number) => {
      const extServItem = extra_services.find((extServ) => extServ.id === id);
      return extServItem?.name;
    }) || [];

  const driverId: any = store.getState().auth.id;
  console.log(orderId);
  console.log(driverId);

  // const driverInfo: any = localStorage.getItem('refreshToken');
  // const driver: any = jwt_decode(driverInfo);
  // const driverId = driver.id;

  return (
    <div className="box">
      <Container>
        <Row>
          <ColInfo ass="col-6"
            icon={faMapMarkerAlt}
            order={order.from}
          />
          <ColInfo
            ass="col-4  padding-0"
            icon={faStar}
            order={order.user?.name}
          />
        </Row>

        <Row>
          <ColInfo ass="col-6" icon={faArrowAltCircleRight} order={order.to} />
        </Row>

        <Row>
          <Col xs="6">
            <p id={'togler' + order.id}>
              <FontAwesomeIcon icon={faInfoCircle} /> More info
            </p>
          </Col>
          {carType && (
            <ColInfo ass="col-4 padding-0" icon={faTaxi} order={carType.name} />
          )}
          <ColInfo
            ass="padding-0"
            icon={faHryvnia}
            order={<strong>{order.price}</strong>}
          />
        </Row>
        <div className="wrapper-round-button">
            <Link to={`/driver/order/${order.id}`}>
              <Button
                onClick={(e: any) => changeStatus(orderId, driverId)}
                className="round-button"
                color="primary"
                size="sm"
              >
                Take
              </Button>
            </Link>
          </div>
      </Container>

      <div>
        <UncontrolledCollapse toggler={'#togler' + order.id}>
          <Card id="card">
            <CardBody>
              <span>
                Extra services: {extraServices.join(', ').toLowerCase()}
              </span>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    </div>
  );
};

export default OrderItem;
