import {Login} from './components/Login/Login';
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from './utils/consts';
import {Registration} from './components/Login/Registration';
import {RouteProps} from 'react-router-dom';

// export const authRouters = [
//     {
//         path: ORDER_ROUTE,
//         Component: Order
//     },

// ]

export const publicRouters: RouteProps[] = [
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
];
