import { FC, SyntheticEvent, FormEvent } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {
  Form,
  Button,
  Jumbotron,
  Alert,
  ButtonToolbar,
  Spinner,
} from 'react-bootstrap';

import { Input } from '../../../components/Input/Input';
import { FormLabel } from '../../../components/FormLabel/FormLabel';
import { CarTypesSelect } from '../../../components/CarTypeSelect/CarTypesSelect';
import { ExtraServicesSelect } from '../../../components/ExtraServices/ExtraServicesSelect';
import { Price } from '../../../components/Price/Price';
import { CarTypesI, ExtraServicesI } from '../../../types/cityInfoTypes';

import './OrderFrom.scss';

interface OrderFormProps {
  onSubmit: (e: SyntheticEvent) => void;
  onCarTypeChange: (e: any) => void;
  onExtraServicesChanged: () => void;
  loading: boolean;
  error: boolean;
  isMapLoaded: boolean;
  formRef: any;
  onFromAutocompleteLoad: (autocomplete: any) => void;
  onToAutocompleteLoad: (autocomplete: any) => void;
  onToAutocompleteChanged: () => void;
  onFromAutocompleteChanged: () => void;
  fromValue: string;
  toValue: string;
  carTypes?: CarTypesI[];
  extraServices?: ExtraServicesI[];
  onFromChangeHandler: (e: FormEvent<HTMLInputElement>) => void;
  onToChangeHandler: (e: FormEvent<HTMLInputElement>) => void;
  selectedCarTypeValue: string;
  avaliableCarTypes: CarTypesI[];
  avaliableInCityExtraServices: ExtraServicesI[];
  activeExtraServices: number[];
  currentCity: string;
  price: number;
}

export const OrderForm: FC<OrderFormProps> = ({
  onSubmit,
  onCarTypeChange,
  onExtraServicesChanged,
  loading,
  error,
  isMapLoaded,
  formRef,
  onFromAutocompleteChanged,
  onToAutocompleteChanged,
  onFromAutocompleteLoad,
  onToAutocompleteLoad,
  fromValue,
  toValue,
  onFromChangeHandler,
  onToChangeHandler,
  selectedCarTypeValue,
  avaliableCarTypes,
  avaliableInCityExtraServices,
  activeExtraServices,
  currentCity,
  price,
}) => {
  return (
    <>
      <Jumbotron className="dark order">
        <Form ref={formRef} className="order__form" onSubmit={onSubmit}>
          {/* <Alert variant="primary">Your current location : {currentCity}</Alert> */}
          <Form.Group className="form-group">
            <FormLabel classNames={['col-xs-2']} htmlFor="from" title="From:" />
            <div className="col-xs-4">
              {isMapLoaded && (
                <Autocomplete
                  onLoad={onFromAutocompleteLoad}
                  onPlaceChanged={onFromAutocompleteChanged}
                >
                  <Input
                    onChange={onFromChangeHandler}
                    value={fromValue}
                    className="input input--padding input--bd-radius input--block"
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
              {isMapLoaded && (
                <Autocomplete
                  onLoad={onToAutocompleteLoad}
                  onPlaceChanged={onToAutocompleteChanged}
                >
                  <Input
                    value={toValue}
                    onChange={onToChangeHandler}
                    className="input input--padding input--bd-radius input--block"
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
              selectedValue={selectedCarTypeValue}
              onChange={onCarTypeChange}
              carTypes={avaliableCarTypes}
            />
          </Form.Group>

          <Form.Group>
            <ExtraServicesSelect
              avaliableInCityExtraServices={avaliableInCityExtraServices}
              activeExtraServices={activeExtraServices}
              onExtraServicesChanged={onExtraServicesChanged}
            />
          </Form.Group>

          <div className="col-xs-offset-2 col-xs-10">
            <ButtonToolbar className="order__button-toolbar">
              <Price price={price} />
              <button
                className="button button--hovered button--outlined button--border"
                // variant="info"
                disabled={loading}
                title={'Make order'}
              >
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
              </button>
            </ButtonToolbar>
          </div>
        </Form>
      </Jumbotron>
    </>
  );
};
