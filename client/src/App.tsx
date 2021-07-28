import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './reduxStore';
import AppRouterContainer from './pages/AppRouterContainer';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/theme.scss';
import './styles/common.scss';
import './App.scss';
import Feedback from './pages/feedback/Feedback';
import Navbar from './components/Navbar/Navbar';
import { useTypedSelector } from '../src/hooks/useTypedSelector';

const NavbarWrapper = () => {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  return isAuth ? <Navbar /> : null;
};

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouterContainer />
        <NavbarWrapper />
        <Feedback />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
