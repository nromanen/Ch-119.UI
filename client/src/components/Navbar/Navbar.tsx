import './Navbar.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { DRIVER_ROLE } from '../../constants/registrationConstants';
import { NavTab } from './NavTab';
import { DriverNavTabs, userNavTabs } from './NavTabsMaper';
import { NavTabI } from '../../types/interfaces';

const Navbar = () => {
  const { role } = useTypedSelector((state) => state.auth);
  const isDriver = role.includes(DRIVER_ROLE);
  const NavbarTabs = isDriver ? DriverNavTabs : userNavTabs;

  return (
    <nav className="navigation">
      <ul>
        {NavbarTabs.map(({ route, content }: NavTabI) => (
          <NavTab key={route} route={route} content={content} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
