import React, { useEffect } from 'react';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';
import { UserRoles } from '../../../constants/userRoles';

export const DriverHistory = () => {
  const { fetchDriverOrderHistoryAction } = useDriverOrderNewActions();
  const userRole = useTypedSelector((state) =>
    state.auth.role.includes('DRIVER') ? UserRoles.DRIVER : UserRoles.USER,
  );
  useEffect(() => {
    fetchDriverOrderHistoryAction();
  }, []);
  const { history: list } = useTypedSelector((state) => state.driverOrders);

  if (!list.length) {
    return <div>You have't done any order</div>;
  }

  return (
    <ul className="order__list">
      {list.map((order: any) => {
        const feedback = order.feedbacks.find(
          (feedback: any) => feedback.author_role === userRole,
        );
        const showFeedbackButton = !feedback?.author_role;
        return (
          <OrderItem
            key={order.id}
            orderId={order.id}
            customerId={order.customer_id}
            from={order.from}
            to={order.to}
            status={order.status}
            price={order.price}
            carType={order.car_type.name}
            extraServices={order.extra_services}
            lastUpdate={order.updatedAt}
            isDriver={true} // TODO change dynamic
            page={Pages.HISTORY}
            showFeedbackButton={showFeedbackButton}
          />
        );
      })}
    </ul>
  );
};
