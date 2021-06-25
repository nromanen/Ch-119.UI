import { FC, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRouters, publicRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';
import { useTypedSelector } from '../hooks/useTypedSelector';
import jwtDecode from 'jwt-decode';

const AppRouter: FC = (props: any) => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenInfo: any = jwtDecode(token);
        if (!tokenInfo.driver_info) {
          props.setUser(tokenInfo);
        } else {
          props.setDriver(tokenInfo);
        }
      }
    }
  }, []);

  return (
    <Switch>
      {publicRouters.map(({ path, component }) => (
        <Route key={path?.toString()} path={path} component={component} exact />
      ))}
      {console.log(isAuth)}
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
