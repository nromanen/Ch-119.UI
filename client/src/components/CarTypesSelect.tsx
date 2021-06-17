import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import { CarTypesI } from './../pages/Order/mapService';
import { ChangeValueAction } from './../types/orderTypes';

interface CarTypesSelectI {
  id: string;
  value: string;
  onChange: (e: any) => ChangeValueAction;
  carTypes?: CarTypesI[];
}

export const CarTypesSelect: FC<CarTypesSelectI> = ({
  id,
  value,
  onChange,
  carTypes,
}) => {
  return carTypes ? (
    <Form.Control
      as="select"
      id={id}
      className="form-select form-control col-xs-4"
      aria-label="Car type select"
      value={value}
      onChange={onChange}
    >
      {carTypes.map(({ id, name }) => {
        return (
          <option key={id} value={name}>
            {name}
          </option>
        );
      })}
    </Form.Control>
  ) : null;
};
