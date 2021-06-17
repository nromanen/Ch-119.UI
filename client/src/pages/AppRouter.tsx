import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { publicRouters, authRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';
import history from '../reduxStore';

const AppRouter: FC = () => {
  return (
    <Switch>
      {authRouters.map(({ path, component }) => (
        <Route key={path?.toString()} path={path} component={component} exact/>
      ))}

      {publicRouters.map(({ path, component }) => (
        <Route key={path?.toString()} path={path} component={component} exact/>
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
