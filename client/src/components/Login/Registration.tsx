import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

export const Registration: FC = () => {
  return (
    <div className='jumbotron'>
      <div className='container-fluid'>
        <h1>Registration</h1>

        <form className='form-horizontal'>
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='name'>
              Name:
            </label>
            <div className='col-xs-4'>
              <input type='text' name='name' id='name' />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='phone'>
              Phone number:
            </label>
            <div className='col-xs-4'>
              <input
                type='phone'
                name='phone'
                id='phone'
                placeholder='+380501233314'
              />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='password'>
              Password:
            </label>
            <div className='col-xs-4'>
              <input type='password' name='password' id='password' />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='password'>
              Repeat password:
            </label>
            <div className='col-xs-4'>
              <input type='password' name='password' id='password' />
            </div>
          </div>
        </form>
        <div className='col-xs-offset-2 col-xs-10 ml-5'>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
};
