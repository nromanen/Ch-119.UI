import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';

import {
  cityInfoReducer,
  initialState as InfoState,
} from './reducers/cityInfoReducer';
import { mapReducer, initialState as MapState } from './reducers/mapReducer';
import {
  orderReducer,
  initialState as OrderState,
} from './reducers/orderReducer';
import { authReducer, initialState as AuthState } from './reducers/authReducer';
import { rootWatcher } from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  auth: AuthState,
  order: OrderState,
  cityInfo: InfoState,
  map: MapState,
};

export const history = createBrowserHistory();
const browserMiddleware = routerMiddleware(history);

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    order: orderReducer,
    cityInfo: cityInfoReducer,
    map: mapReducer,
  });

const rootReducers = rootReducer(history);

const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, browserMiddleware)),
);

export type RootState = ReturnType<typeof rootReducers>;

sagaMiddleware.run(rootWatcher);

export default store;
