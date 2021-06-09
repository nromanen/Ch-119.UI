import store from './reduxStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './pages/AppRouter';

import 'bootstrap/dist/css/bootstrap.min.css';
/**
 * @return {Object}
 */
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
