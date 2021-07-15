import {
    MAKE_ORDER_ROUTE,
    PROFILE_ROUTE,
    ACTIVE_ORDERS_ROUTE,
    HISTORY_ROUTE,
    CURRENT_DRIVER_ROUTE,
    CURRENT_USER_ROUTE,
} from '../../constants/routerConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faListUl, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';

const HISTORY_TAB = {
    route: HISTORY_ROUTE,
    content: <FontAwesomeIcon icon={faHistory} size="lg" />,
};

const PROFILE_TAB = {
    route: PROFILE_ROUTE,
    content: <FontAwesomeIcon icon={faUser} size="lg" />,
};

export const DriverNavTabs = [
    {
        route: ACTIVE_ORDERS_ROUTE,
        content: <FontAwesomeIcon icon={faListUl} size="lg" />,
    },
    HISTORY_TAB,
    {
        route: CURRENT_DRIVER_ROUTE,
        content: <FontAwesomeIcon icon={faCheck} size="lg" />,
    },
    PROFILE_TAB,
];

export const userNavTabs = (orderId: number) => ([
    HISTORY_TAB,
    (orderId && {
        route: CURRENT_USER_ROUTE + orderId,
        content: <FontAwesomeIcon icon={faCheck} size="lg" />,
    }),
    {
        route: MAKE_ORDER_ROUTE,
        content: <FontAwesomeIcon icon={faPlus} size="lg" />,
    },
    PROFILE_TAB,
]);

