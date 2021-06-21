import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Profile: FC = (props: any) => {
  return (
    <div className='jumbotron'>
      <div>Profile Component</div>
      <button onClick={props.logoutUser}>Log out</button>
    </div>
  );
};

export default Profile;
