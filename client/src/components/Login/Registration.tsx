import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';

export const Registration: FC = () => {
  return (
    <div className='jumbotron'>
      <div className='container-fluid'>
        <h1>Registration</h1>
        <Form
          onSubmit={(formObj) => {
            console.log(formObj);
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className='form-horizontal'>
              <div className='form-group'>
                <label className='col-xs-2' htmlFor='name'>
                  Name:
                </label>
                <div className='col-xs-4'>
                  <Field name='name'>
                    {({ input }) => <input type='text' id='name' {...input} />}
                  </Field>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-xs-2' htmlFor='phone'>
                  Phone number:
                </label>
                <div className='col-xs-4'>
                  <Field name='phone'>
                    {({ input }) => (
                      <input
                        type='phone'
                        id='phone'
                        placeholder='+380501233314'
                        {...input}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-xs-2' htmlFor='password'>
                  Password:
                </label>
                <div className='col-xs-4'>
                  <Field name='password'>
                    {({ input }) => (
                      <input type='password' id='password' {...input} />
                    )}
                  </Field>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-xs-2' htmlFor='rpassword'>
                  Repeat password:
                </label>
                <div className='col-xs-4'>
                  <Field name='rpassword'>
                    {({ input }) => (
                      <input type='password' id='rpassword' {...input} />
                    )}
                  </Field>
                </div>
                <div className='col-xs-offset-2 col-xs-10 ml-5'>
                  <Button type='submit'>Register</Button>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};
