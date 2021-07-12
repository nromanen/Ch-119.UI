import React, { useEffect } from 'react';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';
import Navbar from '../../../components/Navbar/Navbar';

export const DriverActive = () => {
  const { fetchDriverOrderNewAction } = useDriverOrderNewActions();
  const { current } = useTypedSelector((state) => state.driverOrders);

  const mayTakeOrder = !!current.length;

  // TODO do not refetch because tabs do not render again but make display: none
  useEffect(() => {
    fetchDriverOrderNewAction();
  }, []);

  const { active: list } = useTypedSelector((state) => state.driverOrders);

  if (!list.length) {
    return (
      <>
        <div>Nobody wants to ride</div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="dark">
      <ul className="order__list">
        <p>Active orders:</p>
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
              mayTakeOrder={mayTakeOrder}
            />
          );
        })}
      </ul>
      <Navbar />
    </div>
  );
};
