import LoginContainer from './components/Login/LoginContainer';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './constants/routerConstants';
import { RouteProps } from 'react-router-dom';
import RegistrationContainer from './components/Login/RegistrationContainer';

// export const authRouters = [
//     {
//         path: ORDER_ROUTE,
//         Component: Order
//     },

// ]

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
