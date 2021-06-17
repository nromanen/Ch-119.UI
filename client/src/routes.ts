import LoginContainer from './components/Login/LoginContainer';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
} from './constants/routerConstants';
import { RouteProps } from 'react-router-dom';
import RegistrationContainer from './components/Login/RegistrationContainer';
import Order from './pages/Order/Order';
import ProfileContainer from './pages/Profile/ProfileContainer';

export const authRouters = [
  {
    path: ORDER_ROUTE,
    component: Order,
  },
  {
    path: PROFILE_ROUTE,
    component: ProfileContainer,
  },
];

export const publicRouters: RouteProps[] = [
  {
    path: LOGIN_ROUTE,
    component: LoginContainer,
  },
  {
    path: REGISTRATION_ROUTE,
    component: RegistrationContainer,
  },
];
