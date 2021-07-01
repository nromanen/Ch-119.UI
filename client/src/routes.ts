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

import OrderList from './pages/Order/OrderList';
import OrderDriverAccepted from './pages/Order/OrderDriverAccepted';
import OrderUserActive from './pages/Order/OrderUserActive';

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
