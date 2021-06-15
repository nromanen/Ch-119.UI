import { FC, SyntheticEvent, useRef, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete } from '@react-google-maps/api';
import {
  Accordion,
  Card,
  Badge,
  Form,
  Button,
  Jumbotron,
  Alert,
  ButtonToolbar,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useOrderActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CarTypesI, ExtraServicesI } from './mapService';

import { ReactComponent as BabyChair } from './icons/babyChair.svg';
import { ReactComponent as En } from './icons/en.svg';
import { ReactComponent as Silent } from './icons/silent.svg';

interface IconsI {
  [index: string]: any;
}

const extraServicesIcons: IconsI = {
  'English speaking': En,
  'Silent driver': Silent,
  'Baby chair': BabyChair,
};

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
  carTypes?: CarTypesI[];
  extraServices?: ExtraServicesI[];
  // currentCity?: string;
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
  // currentCity,
}) => {
  const { changeOrderValue } = useOrderActions();
  const info = useTypedSelector((state) => state.cityInfo);
  const order = useTypedSelector((state) => state.order);
  const formRef = useRef<any>(null);

  const { name: currentCity } = useTypedSelector((state) => state.cityInfo);

  const calculatePrice = (prices: any) => {
    const servicesPrice = prices.services.reduce(
      (acc: number, val: number) => acc + val,
      0,
    );
    return Math.ceil(
      prices.initial +
        prices.distance * prices.distanceCoef * prices.carTypeCoef +
        servicesPrice -
        prices.discount,
    );
  };

  useEffect(() => {
    const carTypeCoef = info.car_types.find(
      (carType) => carType.name === order.car_type,
    )?.city_car_type.coef;

    const servicePrices = order.extraServices.map((service) => {
      return info.extra_services.find((s) => s.name === service)?.city_service
        .price;
    });

    const value = {
      initial: info.basePrice,
      distanceCoef: info.basePriceForKm,
      carTypeCoef: carTypeCoef,
      services: servicePrices,
      distance: order.distance.value ? order.distance.value / 1000 : 0,
      discount: 0,
    };

    const price = calculatePrice(value);
    price && changeOrderValue('price', price);
  }, [info, order.car_type, order.distance, order.extraServices]);

  const onExtraServicesChanged = () => {
    let services: Array<HTMLInputElement> = Array.from(
      formRef.current?.elements.extraServices!,
    );

    services = services.filter((el: HTMLInputElement) => el.checked);

    const extraServices = services.map((el: HTMLInputElement) => el.value);

    changeOrderValue('extraServices', extraServices);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/v1/order', {
        body: {
          ...order,
          // get User.id from redux
          customer_id: 1,
        },
      })
      .then((res) => {
        console.log('create order', res);
      });
  };

  return (
    <Jumbotron className="order">
      <Form ref={formRef} className="order__form" onSubmit={onSubmit}>
        <Alert variant="primary">Your current location : {currentCity}</Alert>
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
            onChange={(e) => changeOrderValue('car_type', e.target.value)}
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
                <Card.Body className="extra-service">
                  {extraServices?.map(({ id, name }) => {
                    const Icon: any = extraServicesIcons[name];
                    const isActive = order.extraServices.includes(name);
                    const iconClass = ['order__service-icon'];
                    if (isActive) {
                      iconClass.push('active');
                    }

                    return (
                      <OverlayTrigger
                        key={id}
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            <strong>{name}</strong>.
                          </Tooltip>
                        }
                      >
                        <Form.Label
                          className="col-xs-2 extra-service__label"
                          htmlFor={name}
                        >
                          {/* {name} */}
                          <Form.Check
                            hidden
                            id={name}
                            aria-label={name}
                            type="checkbox"
                            // label={name}
                            data-db-id={id}
                            name="extraServices"
                            value={name}
                            onChange={onExtraServicesChanged}
                          />
                          <Icon className={iconClass.join(' ')} />
                        </Form.Label>
                      </OverlayTrigger>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Form.Group>

        {order.distance.value && (
          <Badge as="p" className="order__price" variant="primary">
            &#x20b4; {order.price}
          </Badge>
        )}
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
