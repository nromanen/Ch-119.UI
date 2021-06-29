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
import { ColInfo } from './colInfo';
import { useTypedSelector } from '../hooks/useTypedSelector';
import jwt_decode from 'jwt-decode';
import { useOrderActions } from '../hooks/useActions';

const OrderItem = ({ order }: any) => {
  const { updateOrderState } = useOrderActions();
  const changeStatus = async (
    orderId: number | string,
    driverId: number | string,
  ) => {
    await axios.put(`${process.env.REACT_APP_SERVER_URL}order/${orderId}`, {
      body: {
        id: `${orderId}`,
        status: 'accepted',
        customer_id: driverId,
      },
    });
    updateOrderState(order);
  };

  const { car_types } = useTypedSelector((state) => state.cityInfo);
  const carType = car_types.find((type) => type.id === order.carTypeId);

  const { extra_services } = useTypedSelector((state) => state.cityInfo);
  const extraServices =
    order.extra_services.map((id: number) => {
      const extServItem = extra_services.find((extServ) => extServ.id === id);
      return extServItem?.name;
    }) || [];

  const driverInfo: any = localStorage.getItem('refreshToken');

  const driver: any = jwt_decode(driverInfo);

  return (
    <div className="box">
      <Container>
        <Row>
          <ColInfo xs="col-6" icon={faMapMarkerAlt} order={order.from} />
          <ColInfo
            xs="col-4  padding-0"
            icon={faStar}
            order={order.user?.name}
          />
          <Col>
            <Link to={`/driver/order/${order.id}`}>
              <Button
                onClick={(e: any) => changeStatus(order.id, driver.id)}
                className="round-button"
                color="primary"
                size="sm"
              >
                Take
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <ColInfo xs="col-6" icon={faArrowAltCircleRight} order={order.to} />
        </Row>

        <Row>
          <Col xs="6">
            <p id={'togler' + order.id}>
              <FontAwesomeIcon icon={faInfoCircle} /> More info
            </p>
          </Col>
          {carType && (
            <ColInfo xs="col-4 padding-0" icon={faTaxi} order={carType.name} />
          )}
          <ColInfo
            xs="padding-0"
            icon={faHryvnia}
            order={<strong>{order.price}</strong>}
          />
        </Row>
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
