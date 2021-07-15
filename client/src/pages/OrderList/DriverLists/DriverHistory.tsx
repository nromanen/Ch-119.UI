import { useEffect } from 'react';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';
import { showFeedbackButton } from '../../../services/orderService';
import { getUserRole } from '../../../utils/getters';

export const DriverHistory = () => {
  const { fetchDriverOrderHistoryAction } = useDriverOrderNewActions();
  useEffect(() => {
    fetchDriverOrderHistoryAction();
  }, []);
  const { history: list } = useTypedSelector((state) => state.driverOrders);
  const userRole = useTypedSelector(getUserRole);

  if (!list.length) {
    return <div>You have't done any order</div>;
  }

  return (
    <ul className="order__list">
      {list.map((order: any) => {
        const isShown = showFeedbackButton(order.feedbacks, userRole);
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
            showFeedbackButton={isShown}
          />
        );
      })}
    </ul>
  );
};
