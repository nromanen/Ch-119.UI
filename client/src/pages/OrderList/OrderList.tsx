import React, { useEffect } from 'react';
import { useDriverOrderNewActions } from '../../hooks/useActions';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { OrderItem } from './OrderItem';

import './OrderList.scss';
import Navbar from './../../components/Navbar/Navbar';

export enum Pages {
  ALL = 'ALL',
  CURRENT = 'CURRENT',
}

export const OrderList = () => {
  const { fetchDriverOrderNew } = useDriverOrderNewActions();
  useEffect(() => {
    fetchDriverOrderNew();
  }, []);

  const { list } = useTypedSelector((state) => state.driverOrdes);
  return (
    <>
      <div className="dark">
        <ul className="order__list">
          {list.map((order: any) => {
            return (
              <OrderItem
                key={order.id}
                from={order.from}
                to={order.to}
                status={order.status}
                price={order.price}
                carType={order.car_type.name}
                extraServices={order.extra_services}
                lastUpdate={order.updatedAt}
                isDriver={true}
                page={Pages.CURRENT}
              />
            );
          })}
        </ul>
        <Navbar></Navbar>
      </div>
    </>
  );
};
