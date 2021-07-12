import React, { useEffect } from 'react';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';
import { UserRoles } from '../../../constants/userRoles';
import Navbar from '../../../components/Navbar/Navbar';

export const DriverHistory = () => {
  const { fetchDriverOrderHistoryAction } = useDriverOrderNewActions();
  useEffect(() => {
    fetchDriverOrderHistoryAction();
  }, []);
  const { history: list } = useTypedSelector((state) => state.driverOrders);

  if (!list.length) {
    return (
      <>
        <div>You have not done any orders</div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="dark">
      <ul className="order__list">
        <p>History:</p>
        {list.map((order: any) => {
          const feedback = order.feedbacks.filter(
            (feedback: any) => feedback.authorRole === UserRoles.DRIVER,
          )[0];
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
              page={Pages.HISTORY}
              feedback={feedback}
            />
          );
        })}
      </ul>
      <Navbar />
    </div>
  );
};
