import { Order } from './pages/Order/Order';
import LoginContainer from './components/Login/LoginContainer';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
} from './constants/routerConstants';
import RegistrationContainer from './components/Login/RegistrationContainer';
import ProfileContainer from './pages/Profile/ProfileContainer';
import OrderDriverActive from './pages/Order/orderDriverActive';
import OrderDriverAccepted from './pages/Order/orderDriverAccepted';
import OrderUserActive from './pages/Order/orderUserActive';
import { ORDER_ACTIVE_ROUTE } from './constants/routerConstants';
import { ORDER_ACCEPTED_ROUTE } from './constants/routerConstants';
import { ORDER_USER_ROUTE } from './constants/routerConstants';

export const authRouters = [
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
    component: OrderDriverActive,
  },
  {
    path: ORDER_ACCEPTED_ROUTE,
    component: OrderDriverAccepted,
  },
  {
    path: ORDER_USER_ROUTE,
    component: OrderUserActive,
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
