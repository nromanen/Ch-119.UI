import { RouteProps } from 'react-router-dom';
import { FEEDBACK_ROUTE } from './constants/routerConstants';
import Feedback from './pages/feedback/Feedback';
// import { Comp } from './components/Comp';

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
];
