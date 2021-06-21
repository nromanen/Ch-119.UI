import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './reduxStore';
import AppRouter from './pages/AppRouter';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * @return {Object}
 */
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRouter />
        </ConnectedRouter>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
