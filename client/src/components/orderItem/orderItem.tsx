import axios from 'axios';
import {Link} from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faArrowAltCircleRight, faHryvnia, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'reactstrap';
import '../app.scss';


const changeStatus = async (id: number | string) => {
    const data = await axios.put(`${process.env.REACT_APP_HOST}order/${id}`, {
        // id: `${id}`,
        // status: 'accepted',
  });
  console.log(data);
};

const OrderItem = ({order}: any) => {
    return (
      <div className="box">
        <Container>
          <Row>
            <Col xs="6">
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {order.from}</p>
            </Col>
            <Col>
            <p>Rating:</p>
            </Col>
            <Col>
            <Link to={`/order/${order.id}`}>
          <Button onClick={(e) => changeStatus(order.id)} color="primary" size="sm">Take order</Button>
        </Link>
            </Col>
          </Row>
          <Row>
          <Col xs="6">
            <p><FontAwesomeIcon icon={faArrowAltCircleRight} /> {order.to}</p>
            </Col>
            </Row>
            <Row>
              <Col xs="6">
              <p id={'togler' + order.id}><FontAwesomeIcon icon={faInfoCircle}/> Info</p>
            </Col>
            <Col>
            <p>Car type: {order.car_type}</p>
            </Col>
            <Col>
            <p><strong><FontAwesomeIcon icon={faHryvnia} /> {order.price}</strong></p>
            </Col>
            </Row>
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      <div>
      <UncontrolledCollapse toggler={'#togler' + order.id}>
      <Card id="card">
        <CardBody>
          <p className="extra-service">Extra services: {order.extra_services}</p>
        </CardBody>
      </Card>
      </UncontrolledCollapse>
        </div>
      </div>
    );
};

export default OrderItem;
