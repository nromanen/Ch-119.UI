import { Login } from './components/Login/Login';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './constants/routerConstants';
import { Registration } from './components/Login/Registration';
import { RouteProps } from 'react-router-dom';
import { FEEDBACK_ROUTE } from './constants/routerConstants';
import Feedback from './pages/feedback/Feedback';
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

export const publicRouters: RouteProps[] = [
  {
    path: FEEDBACK_ROUTE,
    component: Feedback,
    exact: true,
  },
  {
    path: LOGIN_ROUTE,
    component: Login,
    exact: true,
  },
  {
    path: REGISTRATION_ROUTE,
    component: Registration,
    exact: true,
  },
  { path: '/', component: Order },
];
