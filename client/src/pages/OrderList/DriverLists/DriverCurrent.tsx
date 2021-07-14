import React, { useEffect } from 'react';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';
import Navbar from '../../../components/Navbar/Navbar';

export const DriverCurrent = () => {
  const { fetchDriverOrderCurrentAction } = useDriverOrderNewActions();
  useEffect(() => {
    fetchDriverOrderCurrentAction();
  }, []);

  const { current: list } = useTypedSelector((state) => state.driverOrders);

  if (!list.length) {
    return (
      <>
        <div className="overflow">
          <div className="taxi-img animation">
            <p>no current orders</p>
          </div>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="dark">
      <ul className="order__list">
        <p>Current:</p>
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
              page={Pages.CURRENT}
              customerInfo={order.user}
            />
          );
        })}
      </ul>
      <Navbar />
    </div>
  );
};
