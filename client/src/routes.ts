import { Login } from './components/Login/Login';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './constants/routerConstants';
import { Registration } from './components/Login/Registration';
import { RouteProps } from 'react-router-dom';
import { FEEDBACK_ROUTE } from './constants/routerConstants';
import Feedback from './pages/feedback/Feedback';
// import { Comp } from './components/Comp';
import { Order } from './pages/Order/Order';

// export const authRouters = [
//     {
//         path: ORDER_ROUTE,
//         Component: Order
//     },

// ]

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
