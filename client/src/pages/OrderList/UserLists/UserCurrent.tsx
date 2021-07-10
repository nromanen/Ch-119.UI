import React, { useEffect } from 'react';

import { useUserOrderActions } from '../../../hooks/useActions';
import { useTypedSelector } from './../../../hooks/useTypedSelector';

import { Pages } from '../OrderList';
import { OrderItem } from './../OrderItem/OrderItem';

export const UserCurrent = () => {
  const { fetchUserOrderCurrentAction } = useUserOrderActions();

  useEffect(() => {
    fetchUserOrderCurrentAction();
  }, []);

  const { current: list } = useTypedSelector((state) => state.userOrders);

  if (!list.length) {
    return <div>You didn't make any order</div>;
  }
  return (
    <ul className="order__list">
      {list.map((order: any) => {
        return (
          <OrderItem
            key={order.id}
            orderId={order.id}
            from={order.from}
            to={order.to}
            status={order.status}
            price={order.price}
            carType={order.car_type.name}
            extraServices={order.extra_services}
            lastUpdate={order.updatedAt}
            isDriver={false} // TODO change dynamic
            page={Pages.CURRENT}
            driverInfo={order.driver}
          />
        );
      })}
    </ul>
  );
};
