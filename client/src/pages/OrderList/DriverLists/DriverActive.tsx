import React, { useEffect } from 'react';

import { OrderItem } from '../OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';

export const DriverActive = () => {
  const { fetchDriverOrderNew } = useDriverOrderNewActions();

  // TODO do not refetch because tabs do not render again but make display: none
  useEffect(() => {
    fetchDriverOrderNew();
  }, []);

  const { active: list } = useTypedSelector((state) => state.driverOrdes);

  if (!list.length) {
    return <div>Nobody want a ride</div>;
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
            isDriver={true} // TODO change dynamic
            page={Pages.ALL}
          />
        );
      })}
    </ul>
  );
};
