import {
  MAKE_ORDER_ROUTE,
  PROFILE_ROUTE,
  ACTIVE_ORDERS_ROUTE,
  HISTORY_ORDER_ROUTE,
  CURRENT_ORDER_ROUTE,
} from '../../constants/routerConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPlus,
  faListUl,
  faHistory,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const HISTORY_TAB = {
  route: HISTORY_ORDER_ROUTE,
  content: <FontAwesomeIcon icon={faHistory} size="lg" />,
};

const PROFILE_TAB = {
  route: PROFILE_ROUTE,
  content: <FontAwesomeIcon icon={faUser} size="lg" />,
};

const CURRENT_TAB = {
  route: CURRENT_ORDER_ROUTE,
  content: <FontAwesomeIcon icon={faCheck} size="lg" />,
};

export const DriverNavTabs = [
  {
    route: ACTIVE_ORDERS_ROUTE,
    content: <FontAwesomeIcon icon={faListUl} size="lg" />,
  },
  HISTORY_TAB,
  CURRENT_TAB,
  PROFILE_TAB,
];

export const userNavTabs = [
  HISTORY_TAB,
  CURRENT_TAB,
  {
    route: MAKE_ORDER_ROUTE,
    content: <FontAwesomeIcon icon={faPlus} size="lg" />,
  },
  PROFILE_TAB,
];

