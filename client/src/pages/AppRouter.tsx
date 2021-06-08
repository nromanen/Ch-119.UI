import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { publicRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';

const AppRouter: FC = () => {
  return (
    <Switch>
      {publicRouters.map(({ path, component }, index) => (
        <Route path={path} component={component} exact />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
