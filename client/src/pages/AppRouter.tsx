import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRouters, publicRouters } from '../routes';
import { LOGIN_ROUTE } from '../constants/routerConstants';
import { useTypedSelector } from '../hooks/useTypedSelector';
import * as authActions from '../actions/authActions';
import jwtDecode from 'jwt-decode';

const AppRouter: FC = (props: any) => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        // check driverInfo in token and setDriverInfo
        props.setUser(jwtDecode(token)); // add setDriver
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
