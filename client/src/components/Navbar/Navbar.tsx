import './Navbar.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';
import {
  ORDER_ROUTE,
  PROFILE_ROUTE,
  ORDER_ACTIVE_ROUTE,
  HISTORY_ROUTE,
  CURRENT_ROUTE_DRIVER,
  ORDER_USER_ROUTE,
} from '../../constants/routerConstants';
import { DRIVER_ROLE } from '../../constants/registrationConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faListUl, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { role } = useTypedSelector((state) => state.auth);
  const orderId = useTypedSelector((state) => state.userOrders.current[0]?.id);
  const isDriver = role.includes(DRIVER_ROLE);

  return (
    <nav className="navigation">
      <ul>
        {isDriver && (
          <>
            <li className="nav-link">
              <NavLink to={ORDER_ACTIVE_ROUTE} activeClassName="active">
                <FontAwesomeIcon icon={faListUl} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={HISTORY_ROUTE} activeClassName="active">
                <FontAwesomeIcon icon={faHistory} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={CURRENT_ROUTE_DRIVER} activeClassName="active">
                <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={PROFILE_ROUTE} activeClassName="active">
                <FontAwesomeIcon icon={faUser} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
          </>
        )}

        {!isDriver && (
          <>
            <li className="nav-link">
              <NavLink to={HISTORY_ROUTE} activeClassName="active">
                <FontAwesomeIcon icon={faHistory} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={ORDER_USER_ROUTE + orderId} activeClassName="active">
                <FontAwesomeIcon icon={faCheck} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink exact to={ORDER_ROUTE} activeClassName="active">
                <FontAwesomeIcon icon={faPlus} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to={PROFILE_ROUTE} activeClassName="active">
                <FontAwesomeIcon icon={faUser} size="lg"></FontAwesomeIcon>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
