import React, { useEffect } from 'react';

import { OrderItem } from './OrderItem/OrderItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useOrderNewActions } from '../../hooks/useActions';
import { OrderI } from '../../types/driverOrderNew';
import { showFeedbackButton } from '../../services/orderService';
import { getUserRoleAsNumber } from '../../utils/getters';

interface messageI {
  message: string;
}
interface listNameI {
  listName: string;
}

const EmptyOrdersMessage = (props: messageI) => (
  <div className="overflow">
    <div className="taxi-img animation">
      <p>{props.message}</p>
    </div>
  </div>
);

const ListName = (props: listNameI) => (
  <p>{props.listName}</p>
);

const ORDERS_DATA: any = {
  ACTIVE: {
    emptyLabel: 'no active orders',
    listHeader: 'Active Orders',
    ordersListName: 'active',
  },
  CURRENT: {
    emptyLabel: 'no current orders',
    listHeader: 'Current Orders',
    ordersListName: 'current',
  },
  HISTORY: {
    emptyLabel: 'no history orders',
    listHeader: 'History orders',
    ordersListName: 'history',
  },
};

export const OrderList = ({ page }: any) => {
  const { fetchOrderNewAction, fetchOrderCurrentAction, fetchOrderHistoryAction } = useOrderNewActions();

  useEffect(() => {
    switch (page) {
      case 'ACTIVE': {
        fetchOrderNewAction();
        break;
      }
      case 'CURRENT': {
        fetchOrderCurrentAction();
        break;
      }
      case 'HISTORY': {
        fetchOrderHistoryAction();
        break;
      }
      default:
        break;
    }
  }, []);

  const listOfOrders = useTypedSelector((state: any): any => state.orders[ORDERS_DATA[page].ordersListName]);
  const isDriver = useTypedSelector((state) => state.auth.isDriver);
  const userRole = useTypedSelector(getUserRoleAsNumber);
  // const mayTakeOrder = !!listOfOrders.length;

  return !listOfOrders.length ?
    <EmptyOrdersMessage message={ORDERS_DATA[page].emptyLabel} /> : (
      <div className="dark">
        <ul className="order__list">
          <ListName listName={ORDERS_DATA[page].listHeader} />
          {listOfOrders.map((order: OrderI) => {
            const isShown = showFeedbackButton(order.feedbacks, userRole);
            return (
              <OrderItem
                key={order.id}
                orderId={order.id}
                customerId={order.customer_id}
                driverId={order.driverId}
                from={order.from}
                to={order.to}
                status={order.status}
                price={order.price}
                carType={order.car_type.name}
                extraServices={order.extra_services}
                lastUpdate={order.updatedAt}
                isDriver={isDriver}
                page={page}
                // mayTakeOrder={mayTakeOrder}
                showFeedbackButton={isShown}
                // customerInfo={order.user}
                // driverInfo={order.driver}
              />
            );
          })}
        </ul>
      </div>
    );
};
