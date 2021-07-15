import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MAKE_ORDER_ROUTE,
  PROFILE_ROUTE,
  FEEDBACK_ROUTE,
  ACTIVE_ORDERS_ROUTE,
  CURRENT_USER_ROUTE,
  HISTORY_ROUTE,
  CURRENT_DRIVER_ROUTE,
} from './constants/routerConstants';

import Feedback from './pages/feedback/Feedback';
import ProfileContainer from './pages/Profile/ProfileContainer';
import { MakeOrder } from './pages/Order/Order';

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
    path: MAKE_ORDER_ROUTE,
    component: MakeOrder,
  },
  {
    path: CURRENT_USER_ROUTE + ':id',
    component: UserCurrent,
  },
  {
    path: HISTORY_ROUTE,
    component: UserHistory,
  },
  {
    path: ACTIVE_ORDERS_ROUTE,
    component: DriverActive,
  },
  {
    path: CURRENT_DRIVER_ROUTE,
    component: DriverCurrent,
  },
  {
    path: HISTORY_ROUTE,
    component: DriverHistory,
  },
  {
    path: FEEDBACK_ROUTE,
    component: Feedback,
    exact: true,
  },
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
];
