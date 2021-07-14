import React, { useEffect } from 'react';

import { useUserOrderActions } from '../../../hooks/useActions';
import { useTypedSelector } from './../../../hooks/useTypedSelector';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { UserRoles } from '../../../constants/userRoles';
import Navbar from '../../../components/Navbar/Navbar';

export const UserHistory = () => {
  const { fetchUserOrderHistoryAction } = useUserOrderActions();

  useEffect(() => {
    fetchUserOrderHistoryAction();
  }, []);

  const { history: list } = useTypedSelector((state) => state.userOrders);

  if (!list.length) {
    return (
      <>
        <div className="overflow">
          <div className="taxi-img animation">
            <p>no history orders</p>
          </div>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="dark">
      <ul className="order__list">
        {list.map((order: any) => {
          const feedback = order.feedbacks.filter(
            (feedback: any) => feedback.authorRole === UserRoles.USER,
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
              isDriver={false} // TODO change dynamic
              page={Pages.HISTORY}
              driverInfo={order.driver}
              feedback={feedback}
            />
          );
        })}
      </ul>
      <Navbar />
    </div>
  );
};
