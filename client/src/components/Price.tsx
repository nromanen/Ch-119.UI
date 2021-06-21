import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';

interface PricePropsI {
  price: number;
  currencyCodePoint?: number;
}

export const Price: FC<PricePropsI> = ({ price, currencyCodePoint = 8372 }) => {
  return (
    <Badge as="div" className="price" variant="primary">
      {String.fromCodePoint(currencyCodePoint)} {price}
    </Badge>
  );
};
