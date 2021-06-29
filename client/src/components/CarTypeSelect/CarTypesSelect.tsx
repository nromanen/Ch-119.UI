import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { CarTypesSelectI } from '../../types/cityInfoTypes';

export const CarTypesSelect: FC<CarTypesSelectI> = ({
  id,
  selectedValue,
  onChange,
  carTypes,
}) => {
  return carTypes ? (
    <Form.Control
      as="select"
      id={id}
      className="form-select form-control col-xs-4"
      aria-label="Car type select"
      value={selectedValue}
      onChange={onChange}
    >
      {carTypes.map(({ id, name }) => {
        return (
          <option key={id} value={name} data-id={id}>
            {name}
          </option>
        );
      })}
    </Form.Control>
  ) : null;
};
