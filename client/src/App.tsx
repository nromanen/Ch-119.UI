import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './reduxStore';
import AppRouterContainer from './pages/AppRouterContainer';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/theme.scss';
import './styles/common.scss';
import './App.scss';
import Feedback from './pages/Feedback/Feedback';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouterContainer />
        <Feedback />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
