import './Navbar.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';
import { ORDER_ROUTE, PROFILE_ROUTE, ORDER_ACTIVE_ROUTE } from '../../constants/routerConstants';

const Navbar = () => {
  const { role } = useTypedSelector((state) => state.auth);
  const isDriver = role.includes('DRIVER');

  return (
      <nav className='navigation'>
      <ul>
      {isDriver && (<li className='nav-link'><NavLink to={ORDER_ACTIVE_ROUTE} activeClassName='active'>Order-list</NavLink></li>)}
      <li className='nav-link'><NavLink to={ORDER_ROUTE} activeClassName='active'>Make order</NavLink></li>
      <li className='nav-link'><NavLink to={PROFILE_ROUTE} activeClassName='active'>Profile</NavLink></li>
      </ul>
      </nav>
  );
};

export default Navbar;
