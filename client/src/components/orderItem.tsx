import axios from 'axios';
import { Link } from 'react-router-dom';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faArrowAltCircleRight, faHryvnia, faInfoCircle, faTaxi, faStar } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';
import { ColInfo } from './colInfo';
import { useTypedSelector } from '../hooks/useTypedSelector';
import jwt_decode from 'jwt-decode';

const OrderItem = ({ order }: any) => {
  const changeStatus = async (id: number | string) => {
    const data = await axios.put(`${process.env.REACT_APP_SERVER_URL}order/${id}`, {
      id: `${id}`,
      status: 'accepted',
      driver_id: driver.id,
    });
    console.log(data);
  };

  const { car_types } = useTypedSelector((state) => state.cityInfo);
  const carType = car_types.find((type) => type.id === order.carTypeId);

  const driverInfo: any = localStorage.getItem('refreshToken');
  console.log(driverInfo);

  const driver: any = jwt_decode(driverInfo);
  console.log(driver.id);

  return (
    <div className="box">

      <Container>
        <Row>
          <ColInfo xs="col-6" icon={faMapMarkerAlt} order={order.from} />
          <ColInfo xs="col-4  padding-0" icon={faStar} order={<span>4.3 Ivan</span>} />
          <Col>
            <Link to={`/driver/order/${order.id}`}>
              <Button onClick={(e: any) => changeStatus(order.id)} className="round-button" color="primary" size="sm">Take</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <ColInfo xs="col-6" icon={faArrowAltCircleRight} order={order.to} />
        </Row>

        <Row>
          <Col xs="6">
            <p id={'togler' + order.id}><FontAwesomeIcon icon={faInfoCircle} /> More info</p>
          </Col>
          {carType && (
                <ColInfo xs="col-4 padding-0" icon={faTaxi} order={carType.name} />
            )}
          <ColInfo xs="padding-0" icon={faHryvnia} order={<strong>{order.price}</strong>} />
        </Row>
      </Container>

      <div>
        <UncontrolledCollapse toggler={'#togler' + order.id}>
          <Card id="card">
            <CardBody>
              <span>Extra services: {order.extra_services}</span>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    </div>
  );
};

export default OrderItem;
