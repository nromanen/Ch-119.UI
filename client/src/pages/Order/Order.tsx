import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Order: FC = () => {
  return (
    <div className='jumbotron'>
      <div>Order Component</div>
      <NavLink to={'/profile'}>Profile</NavLink>
    </div>
  );
};

export default Order;
