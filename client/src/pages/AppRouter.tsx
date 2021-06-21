import { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRouters, publicRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter: FC = (props: any) => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  return (
    <Switch>
      {publicRouters.map(({ path, component }) => (
        <Route key={path?.toString()} path={path} component={component} exact />
      ))}

      {isAuth &&
        authRouters.map(({ path, component }) => (
          <Route
            key={path?.toString()}
            path={path}
            component={component}
            exact
          />
        ))}

      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
