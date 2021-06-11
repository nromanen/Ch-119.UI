import { FC, SyntheticEvent, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {
  Accordion,
  Card,
  Badge,
  Form,
  Button,
  Jumbotron,
} from 'react-bootstrap';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

interface OrderFormProps {
  createPath?: () => void;
  onFromAutocompleteLoad: (autocomplete: any) => void;
  onToAutocompleteLoad: (autocomplete: any) => void;
  onFromChanged: () => void;
  onToChanged: () => void;
  setTo: (v: string) => void;
  setFrom: (v: string) => void;
  from: string;
  to: string;
  carTypes?: [];
  extraServices?: [];
  currentCity?: string;
}

export const OrderForm: FC<OrderFormProps> = ({
  createPath,
  onFromAutocompleteLoad,
  onFromChanged,
  onToAutocompleteLoad,
  onToChanged,
  from,
  to,
  setFrom,
  setTo,
  carTypes,
  extraServices,
  currentCity,
}) => {
  console.log('carTypes', carTypes);
  console.log('extraServices', extraServices);

  const { changeValue } = useActions();
  const order = useTypedSelector((state) => state.order);
  const formRef = useRef<any>(null);

  const onExtraServicesChanged = () => {
    let services: Array<HTMLInputElement> = Array.from(
      formRef.current?.elements.extraServices!,
    );

    services = services.filter((el: HTMLInputElement) => el.checked);

    const extraServices = services.map((el: HTMLInputElement) => el.value);

    changeValue('extraServices', extraServices);
    console.log(services, 'services');
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('submit');
    axios
      .post('http://localhost:8080/api/v1/order', {
        body: {
          ...order,
          customer_id: 1,
        },
      })
      .then((res) => {
        console.log('create order', res);
      });
  };

  return (
    <Jumbotron>
      <Alert variant="primary">Your current location : {currentCity}</Alert>
      <Form ref={formRef} className="form" onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Form.Label className="col-xs-2" htmlFor="from">
            From:
          </Form.Label>
          <div className="col-xs-4">
            {window?.google && (
              <Autocomplete
                onLoad={onFromAutocompleteLoad}
                onPlaceChanged={onFromChanged}
              >
                <input
                  onChange={(e) => setFrom(e.target.value)}
                  value={from}
                  className="form-control"
                  type="text"
                  name="from"
                  id="from"
                  placeholder="Origin"
                />
              </Autocomplete>
            )}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label className="col-xs-2" htmlFor="to">
            To:
          </Form.Label>
          <div className="col-xs-4">
            {window?.google && (
              <Autocomplete
                onLoad={onToAutocompleteLoad}
                onPlaceChanged={onToChanged}
              >
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="form-control"
                  type="text"
                  name="to"
                  id="to"
                  placeholder="Destination"
                />
              </Autocomplete>
            )}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label className="col-xs-2" htmlFor="car-type">
            Car type:
          </Form.Label>
          <Form.Control
            as="select"
            id="car-type"
            className="form-select form-control col-xs-4"
            aria-label="Car type select"
            value={order.car_type}
            onChange={(e) => changeValue('car_type', e.target.value)}
          >
            {carTypes?.map(({ id, name }) => {
              return (
                <option key={id} value={name}>
                  {name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle as={Form.Label} variant="link" eventKey="0">
              Extra services:
            </Accordion.Toggle>
            <Card>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {extraServices?.map(({ id, name }) => {
                    return (
                      <Form.Check
                        key={id}
                        id={name}
                        aria-label={name}
                        type="checkbox"
                        label={name}
                        data-db-id={id}
                        name="extraServices"
                        value={name}
                        onChange={onExtraServicesChanged}
                      />
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Form.Group>

        <Badge as="p" variant="primary">
          $ 15
        </Badge>
        <div className="col-xs-offset-2 col-xs-10">
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                className="mr-2"
                onClick={createPath}
                type="button"
                variant="info"
              >
                Calculate
              </Button>
              <Button type="submit" variant="info">
                Make order
              </Button>
            </ButtonGroup>
          </ButtonToolbar>

          {/* <button  className="btn btn-lg btn-info">
          Calculate
        </button> */}
        </div>
      </Form>
    </Jumbotron>
  );
};
