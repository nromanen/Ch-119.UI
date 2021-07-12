import React, { FC } from 'react';
import { PricePropsI } from '../../types/cityInfoTypes';
import { CURRENCY_CODE_POINT } from '../../constants/orderConstants';

export const Price: FC<PricePropsI> = ({
  price,
  currencyCodePoint = CURRENCY_CODE_POINT,
}) => {
  return (
    <div className="price">
      {String.fromCodePoint(currencyCodePoint)} {price}
    </div>
  );
};
