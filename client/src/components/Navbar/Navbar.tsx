import './Navbar.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { DRIVER_ROLE } from '../../constants/registrationConstants';
import { NavTab } from './NavTab';
import { DriverNavTabs, userNavTabs } from './NavTabsMaper';

const Navbar = () => {
  const { role } = useTypedSelector((state) => state.auth);
  const orderId = useTypedSelector(
    (state) => state.userOrders.current[0]?.id || ' ',
  );
  const isDriver = role.includes(DRIVER_ROLE);
  const NavbarTabs = isDriver ? DriverNavTabs : userNavTabs(orderId);

  return (
    <nav className="navigation">
      <ul>
        {NavbarTabs.map(({ route, content }: any) => (
          <NavTab key={route} route={route} content={content} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
