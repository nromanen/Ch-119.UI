import React, {FC} from 'react';
import {Button} from 'react-bootstrap';

export const Login: FC = () => {
  return (
    <div className="jumbotron">
      <div className="container-fluid">
        <h1>Login Form</h1>

        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-2" htmlFor="phone">
                Phone number:
            </label>
            <div className="col-xs-4">
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="+380501233314"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-2" htmlFor="password">
            Password:
            </label>
            <div className="col-xs-4">
              <input
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
        </form>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-offset-2 col-xs-10">
              <Button>Login</Button>
            </div>
            <div className="col-xs-offset-2 col-xs-10 ml-5">
              <Button>Register</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
