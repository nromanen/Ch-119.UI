import { NavLink } from 'react-router-dom';
import { NavTabI } from '../../types/interfaces';

export const NavTab = ({ route, className, activeClassName, content }: NavTabI) => (
    <li className={`nav-link ${className}`}>
        <NavLink exact to={route} activeClassName={`active ${activeClassName}`}>
            {content}
        </NavLink>
    </li>
);
