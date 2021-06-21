import React, { FC } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';

const Profile: FC = (props: any) =>
    <div className='jumbotron profile'>
      <div className="profile-info">
      <h2>User Profile</h2>
      <button className='btn btn-danger' onClick={props.logoutUser}>Log out</button>
      </div>
      <Navbar/>
    </div>;


export default Profile;
