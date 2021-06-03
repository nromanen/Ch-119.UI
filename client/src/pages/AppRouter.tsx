import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { publicRouters } from '../routes';
import { LOGIN_ROUTE } from '../utils/constants';

const AppRouter: FC = () => {
  return (
    <Switch>
      {publicRouters.map(({ path, component }) => (
        <Route path={path} component={component} exact />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
