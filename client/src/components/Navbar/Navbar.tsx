import './Navbar.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className='navigation'>
      <ul>
      <li className='nav-link'><NavLink to="/login" activeClassName='active'>Current order</NavLink></li>
      <li className='nav-link'><NavLink to="/driver/order-active" activeClassName='active'>Order-list</NavLink></li>
      <li className='nav-link'><NavLink to="/order" activeClassName='active'>Make order</NavLink></li>
      <li className='nav-link'><NavLink to="/profile" activeClassName='active'>Profile</NavLink></li>
      </ul>
      </nav>
  );
};

export default Navbar;
