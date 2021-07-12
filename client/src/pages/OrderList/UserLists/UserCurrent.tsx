import React, { useEffect } from 'react';

import { useUserOrderActions } from '../../../hooks/useActions';
import { useTypedSelector } from './../../../hooks/useTypedSelector';

import { Pages } from '../OrderList';
import { OrderItem } from './../OrderItem/OrderItem';
import Navbar from '../../../components/Navbar/Navbar';

export const UserCurrent = () => {
  const { fetchUserOrderCurrentAction } = useUserOrderActions();

  useEffect(() => {
    fetchUserOrderCurrentAction();
  }, []);

  const { current: list } = useTypedSelector((state) => state.userOrders);

  if (!list.length) {
    return (
      <>
        <div>Please book a taxi</div>
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
              isDriver={false} // TODO change dynamic
              page={Pages.CURRENT}
              driverInfo={order.driver}
            />
          );
        })}
      </ul>
      <Navbar />
    </div>
  );
};
