import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';
import { PricePropsI } from '../../types/cityInfoTypes';
import { CURRENCY_CODE_POINT } from '../../constants/orderConstants';

export const Price: FC<PricePropsI> = ({ price, currencyCodePoint = CURRENCY_CODE_POINT }) => {
  return (
    <Badge as="div" className="price" variant="primary">
      {String.fromCodePoint(currencyCodePoint)} {price}
    </Badge>
  );
};
