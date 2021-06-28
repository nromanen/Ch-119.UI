import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
  FEEDBACK_ROUTE,
  ORDER_ACTIVE_ROUTE,
  ORDER_ACCEPTED_ROUTE,
  ORDER_USER_ROUTE,
} from './constants/routerConstants';

import Feedback from './pages/feedback/Feedback';
import ProfileContainer from './pages/Profile/ProfileContainer';
import { Order } from './pages/Order/Order';

import LoginContainer from './components/Login/LoginContainer';
import RegistrationContainer from './components/Login/RegistrationContainer';

import OrderDriverActive from './pages/Order/orderDriverActive';
import OrderDriverAccepted from './pages/Order/orderDriverAccepted';
import OrderUserActive from './pages/Order/orderUserActive';
import { OrderList } from './pages/OrderList/OrderList';

export const authRouters = [
  {
    path: ORDER_ROUTE,
    component: Order,
  },
  {
    path: PROFILE_ROUTE,
    component: ProfileContainer,
  },
  {
    path: ORDER_ACTIVE_ROUTE,
    component: OrderList,
  },
  {
    path: ORDER_ACCEPTED_ROUTE,
    component: OrderDriverAccepted,
  },
  {
    path: ORDER_USER_ROUTE + ':id',
    component: OrderUserActive,
  },
  {
    path: FEEDBACK_ROUTE,
    component: Feedback,
    exact: true,
  },
];

export const publicRouters = [
  {
    path: LOGIN_ROUTE,
    component: LoginContainer,
  },
  {
    path: REGISTRATION_ROUTE,
    component: RegistrationContainer,
  },
];
