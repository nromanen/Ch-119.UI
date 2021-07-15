import { useEffect } from 'react';

import { OrderItem } from '../OrderItem/OrderItem';
import { Pages } from '../OrderList';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDriverOrderNewActions } from '../../../hooks/useActions';
import { showFeedbackButton } from '../../../services/orderService';
import { getUserRole } from '../../../utils/getters';
import Navbar from '../../../components/Navbar/Navbar';

export const DriverHistory = () => {
  const { fetchDriverOrderHistoryAction } = useDriverOrderNewActions();
  useEffect(() => {
    fetchDriverOrderHistoryAction();
  }, []);
  const { history: list } = useTypedSelector((state) => state.driverOrders);
  const userRole = useTypedSelector(getUserRole);

  if (!list.length) {
    return (
      <>
        <div className="overflow">
          <div className="taxi-img animation">
            <p>no order history</p>
          </div>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <div className="dark">
      <ul className="order__list">
        <p>History:</p>
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
              isDriver={true}
              page={Pages.HISTORY}
              showFeedbackButton={isShown}
            />
          );
        })}
      </ul>
      <Navbar />
    </div>
  );
};
