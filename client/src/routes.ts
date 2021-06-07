import {RouteProps} from 'react-router-dom';
import OrderList from './components/driver/orderList';
import OrderDeltails from './components/driver/orderDetails';
import { ORDER_LIST_ROUTE } from './constants/routerConstants';
import { ORDER_DETAILS_ROUTE } from './constants/routerConstants';

export const authRouters: RouteProps[] = [
  {
    path: ORDER_LIST_ROUTE,
    component: OrderList,
  },
  {
    path: ORDER_DETAILS_ROUTE,
    component: OrderDeltails,
  },
];

export const publicRouters: RouteProps[] = [];
