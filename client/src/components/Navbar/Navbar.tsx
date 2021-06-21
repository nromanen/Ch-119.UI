import './Navbar.scss';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className='navigation'>
      <ul>
      <li className='item'><NavLink to="/order-active" activeClassName='active'>Current order</NavLink></li>
      <li className='item'><NavLink to="/order-list" activeClassName='active'>Order-list</NavLink></li>
      <li className='item'><NavLink to="/order" activeClassName='active'>Make order</NavLink></li>
      <li className='item'><NavLink to="/profile" activeClassName='active'>Profile</NavLink></li>
      </ul>
      </nav>
  );
};

export default Navbar;
