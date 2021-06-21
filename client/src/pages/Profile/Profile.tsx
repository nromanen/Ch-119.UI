import React, { FC } from 'react';
import './Profile.scss';
import Navbar from '../../components/Navbar/Navbar';

const Profile: FC = (props: any) =>
    <div className='jumbotron profile'>
      <div className="profile-info">
      <h2>User Profile</h2>
      <div className="container profile-text">
        <p><strong>Username:</strong> {props.auth.name}</p>
        <p><strong>Phone:</strong> {props.auth.phone}</p>
        {props.auth.isDriver ? (<React.Fragment>
        <p><strong>Car color:</strong>{props.auth.driver_info.car_color}</p>
        <p><strong>Car model:</strong>{props.auth.driver_info.car_model}</p>
        <p><strong>Car number:</strong>{props.auth.driver_info.car_number}</p>
        </React.Fragment>): null}
        <button className='btn btn-danger' onClick={props.logoutUser}>Log out</button>
      </div>
      </div>
      <Navbar/>
    </div>;


export default Profile;
