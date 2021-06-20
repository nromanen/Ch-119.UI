import store from './reduxStore';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './pages/AppRouter';
import { ConnectedRouter} from 'connected-react-router';
import { history } from './reduxStore';

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
