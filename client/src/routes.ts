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

export const authRouters = [
  {
    path: PROFILE_ROUTE,
    component: ProfileContainer,
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
  {
    path: ORDER_ROUTE,
    component: Order,
  },
];
