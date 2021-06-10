import {RouteProps} from 'react-router-dom';
import OrderActive from './components/driver/orderActive';
import OrderAccepted from './components/driver/orderAccepted';
import { ORDER_ACTIVE_ROUTE } from './constants/routerConstants';
import { ORDER_ACCEPTED_ROUTE } from './constants/routerConstants';
import { Order } from './pages/Order/Order';

export const authRouters: RouteProps[] = [
  {
    path: ORDER_ACTIVE_ROUTE,
    component: OrderActive,
  },
  {
    path: ORDER_ACCEPTED_ROUTE,
    component: OrderAccepted,
  },
];

export const publicRouters = [{ path: '/', component: Order }];
