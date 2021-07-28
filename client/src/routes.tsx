import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MAKE_ORDER_ROUTE,
  PROFILE_ROUTE,
  FEEDBACK_ROUTE,
  ACTIVE_ORDERS_ROUTE,
  HISTORY_ORDER_ROUTE,
  CURRENT_ORDER_ROUTE,
  Pages,
} from './constants/routerConstants';

import Feedback from './pages/feedback/Feedback';
import ProfileContainer from './pages/Profile/ProfileContainer';
import { MakeOrder } from './pages/Order/Order';

import LoginContainer from './components/Login/LoginContainer';
import RegistrationContainer from './components/Login/RegistrationContainer';

import { OrderList } from './pages/OrderList/OrderList';

export const authRouters = [
  {
    path: MAKE_ORDER_ROUTE,
    component: <MakeOrder />,
  },
  {
    path: ACTIVE_ORDERS_ROUTE,
    component: <OrderList page={Pages.ACTIVE} />,
  },
  {
    path: CURRENT_ORDER_ROUTE,
    component: <OrderList page={Pages.CURRENT} />,
  },
  {
    path: HISTORY_ORDER_ROUTE,
    component: <OrderList page={Pages.HISTORY} />,
  },
  {
    path: FEEDBACK_ROUTE,
    component: <Feedback />,
    exact: true,
  },
  {
    path: PROFILE_ROUTE,
    component: <ProfileContainer />,
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
