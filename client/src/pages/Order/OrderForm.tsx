import {
  FC,
  SyntheticEvent,
  useRef,
  useEffect,
  FormEvent,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';
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
  Spinner,
} from 'react-bootstrap';
import { useOrderActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CarTypesI, ExtraServicesI } from './mapService';

import { Input } from './../../components/Input';
import { FormLabel } from './../../components/FormLabel';
import { CarTypesSelect } from './../../components/CarTypesSelect';
import { ExtraServicesSelect } from './../../components/ExtraServicesSelect';
import { makeOrderAction } from '../../actions/orderActions';
import { useDispatch } from 'react-redux';
import { OrderActionTypes } from '../../types/orderTypes';

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
  const { changeOrderValue, makeOrderAction } = useOrderActions();
  const info = useTypedSelector((state) => state.cityInfo);
  const order = useTypedSelector((state) => state.order);
  const { directions } = useTypedSelector((state) => state.map);
  const formRef = useRef<any>(null);
  const { loading, error } = order;
  const { name: currentCity } = useTypedSelector((state) => state.cityInfo);

  const calculatePrice = (prices: any) => {
    const servicesPrice = prices.services.reduce(
      (acc: number, val: number) => acc + +val,
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
      (carType) => carType.id === order.carType.id,
    )?.city_car_type.coef;

    const servicePrices = order.extraServices.map((serviceId) => {
      return info.extra_services.find((s) => s.id === serviceId)?.city_service
        .price;
    });

    const value = {
      initial: info.basePrice,
      distanceCoef: info.basePriceForKm,
      carTypeCoef: carTypeCoef,
      services: servicePrices,
      distance: order.distance!.value ? order.distance!.value / 1000 : 0,
      discount: 0,
    };

    const price = calculatePrice(value);

    price && changeOrderValue('price', price);
  }, [info, order.carType, order.distance, order.extraServices, directions]);

  const onExtraServicesChanged = () => {
    let services: Array<HTMLInputElement> = Array.from(
      formRef.current?.elements.extraServices!,
    );

    services = services.filter((el: HTMLInputElement) => el.checked);

    const extraServices = services.map((el: HTMLInputElement) => {
      return Number(el.dataset.dbId);
    });

    changeOrderValue('extraServices', extraServices);
  };

  const onCarTypeChange = (e: any) => {
    const carType = {
      id: +e.target.selectedOptions[0].dataset.id,
      name: e.target.value,
    };
    changeOrderValue('carType', carType);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    makeOrderAction();
  };

  return (
    <Jumbotron className="order">
      <Form ref={formRef} className="order__form" onSubmit={onSubmit}>
        <Alert variant="primary">Your current location : {currentCity}</Alert>
        <Form.Group className="form-group">
          <FormLabel classNames={['col-xs-2']} htmlFor="from" title="From:" />
          <div className="col-xs-4">
            {window?.google && (
              <Autocomplete
                onLoad={onFromAutocompleteLoad}
                onPlaceChanged={onFromChanged}
              >
                <Input
                  onChange={(e: FormEvent<HTMLInputElement>) => {
                    changeOrderValue('from', e.currentTarget.value);
                  }}
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
          <FormLabel
            classNames={['col-xs-2']}
            htmlFor="to"
            title="To:"
          ></FormLabel>
          <div className="col-xs-4">
            {window?.google && (
              <Autocomplete
                onLoad={onToAutocompleteLoad}
                onPlaceChanged={onToChanged}
              >
                <Input
                  value={to}
                  onChange={(e) =>
                    changeOrderValue('to', e.currentTarget.value)
                  }
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
          <FormLabel title="Car type:" htmlFor="car-type" />
          <CarTypesSelect
            id="car-type"
            selectedValue={order.carType.name}
            onChange={onCarTypeChange}
            carTypes={carTypes}
          />
        </Form.Group>

        <Form.Group>
          <ExtraServicesSelect
            avaliableInCityExtraServices={extraServices}
            activeExtraServices={order.extraServices}
            onExtraServicesChanged={onExtraServicesChanged}
          />
        </Form.Group>

        <div className="col-xs-offset-2 col-xs-10">
          <ButtonToolbar className="order__button-toolbar">
            {order.price > 0 && (
              <Badge as="div" className="order__price" variant="primary">
                &#x20b4; {order.price}
              </Badge>
            )}
            <Button type="submit" variant="info" disabled={loading} size="lg">
              Make order
              {loading && (
                <Spinner
                  animation="border"
                  variant="light"
                  size="sm"
                  as="span"
                  role="making order"
                  aria-hidden="true"
                />
              )}
            </Button>
          </ButtonToolbar>
        </div>
      </Form>
    </Jumbotron>
  );
};
