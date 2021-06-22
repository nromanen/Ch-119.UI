import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, ORDER_ROUTE, PROFILE_ROUTE, ORDER_ACTIVE_ROUTE } from '../../constants/routerConstants';

const Navbar = () => {
  return (
      <nav className='navigation'>
      <ul>
      <li className='nav-link'><NavLink to={LOGIN_ROUTE} activeClassName='active'>Current order</NavLink></li>
      <li className='nav-link'><NavLink to={ORDER_ACTIVE_ROUTE} activeClassName='active'>Order-list</NavLink></li>
      <li className='nav-link'><NavLink to={ORDER_ROUTE} activeClassName='active'>Make order</NavLink></li>
      <li className='nav-link'><NavLink to={PROFILE_ROUTE} activeClassName='active'>Profile</NavLink></li>
      </ul>
      </nav>
  );
};

export default Navbar;
