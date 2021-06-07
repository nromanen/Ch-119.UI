import React, { FC } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { publicRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';

const AppRouter: FC = () => {
  return (
    <Switch>
      {publicRouters.map((route:RouteProps) => (
        <Route key={route.path} path={route.path} component={route.component}/>
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;


