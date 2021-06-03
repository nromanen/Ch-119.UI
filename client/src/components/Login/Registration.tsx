import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RegisterData } from '../../utils/interfaces';

export const Registration: FC = () => {
  const { register, handleSubmit } = useForm<RegisterData>();

  return (
    <div className='jumbotron'>
      <div className='container-fluid'>
        <h1>Registration</h1>

        <form
          className='form-horizontal'
          onSubmit={handleSubmit(data => {
            console.log(data);
          })}
        >
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='name'>
              Name:
            </label>
            <div className='col-xs-4'>
              <input type='text' id='name' {...register('name')} />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='phone'>
              Phone number:
            </label>
            <div className='col-xs-4'>
              <input
                type='phone'
                {...register('phone')}
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
              <input type='password' {...register('password')} id='password' />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-xs-2' htmlFor='rpassword'>
              Repeat password:
            </label>
            <div className='col-xs-4'>
              <input
                type='rpassword'
                {...register('rpassword')}
                id='rpassword'
              />
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
