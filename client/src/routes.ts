import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ORDER_ROUTE,
  PROFILE_ROUTE,
  FEEDBACK_ROUTE,
  ORDER_ACTIVE_ROUTE,
  ORDER_USER_ROUTE,
  HISTORY_ROUTE,
  CURRENT_ROUTE_DRIVER,
} from './constants/routerConstants';

import Feedback from './pages/feedback/Feedback';
import ProfileContainer from './pages/Profile/ProfileContainer';
import { Order } from './pages/Order/Order';

import LoginContainer from './components/Login/LoginContainer';
import RegistrationContainer from './components/Login/RegistrationContainer';

import { DriverActive } from './pages/OrderList/DriverLists/DriverActive';
import { OrderList } from './pages/OrderList/OrderList';
import { DriverCurrent } from './pages/OrderList/DriverLists/DriverCurrent';
import { DriverHistory } from './pages/OrderList/DriverLists/DriverHistory';
import { UserCurrent } from './pages/OrderList/UserLists/UserCurrent';
import { UserHistory } from './pages/OrderList/UserLists/UserHistory';

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
    component: DriverActive,
  },
  {
    path: HISTORY_ROUTE,
    component: DriverHistory,
  },
  {
    path: CURRENT_ROUTE_DRIVER,
    component: DriverCurrent,
  },
  {
    path: ORDER_USER_ROUTE + ':id',
    component: UserCurrent,
  },
  {
    path: HISTORY_ROUTE,
    component: UserHistory,
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
