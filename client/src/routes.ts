import { RouteProps } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
  FEEDBACK_ROUTE,
  ORDER_ACTIVE_ROUTE,
  ORDER_ACCEPTED_ROUTE,
} from './constants/routerConstants';
import Feedback from './pages/feedback/Feedback';
import OrderActive from './components/driver/orderActive';
import OrderAccepted from './components/driver/orderAccepted';
import { Order } from './pages/Order/Order';
import LoginContainer from './components/Login/LoginContainer';
import RegistrationContainer from './components/Login/RegistrationContainer';
import ProfileContainer from './pages/Profile/ProfileContainer';

export const authRouters: RouteProps[] = [
  {
    path: PROFILE_ROUTE,
    component: ProfileContainer,
  },
  {
    path: ORDER_ROUTE,
    component: Order,
  },
  {
    path: ORDER_ACTIVE_ROUTE,
    component: OrderActive,
  },
  {
    path: ORDER_ACCEPTED_ROUTE,
    component: OrderAccepted,
  },
];

export const publicRouters = [
  {
    path: FEEDBACK_ROUTE,
    component: Feedback,
    exact: true,
  },
  {
    path: LOGIN_ROUTE,
    component: LoginContainer,
  },
  {
    path: REGISTRATION_ROUTE,
    component: RegistrationContainer,
  },
];
