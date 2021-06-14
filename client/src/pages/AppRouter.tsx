import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';

const AppRouter: FC = () => {
  return (
    <Switch>
      {/* {publicRouters.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}, */}
      {authRouters.map(({ path, component }, index) => (
        <Route
          key={path?.toString()} path={path} component={component} exact />
      ))},
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
