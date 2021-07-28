import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';

import { mapReducer, initialState as MapState } from './reducers/mapReducer';
import {
  cityInfoReducer,
  initialState as InfoState,
} from './reducers/cityInfoReducer';
import { authReducer, initialState as AuthState } from './reducers/authReducer';
import {
  feedbackReducer,
  initialState as FeedbackState,
} from './reducers/feedbackReducer';

import {
  orderReducer,
  initialState as OrderState,
} from './reducers/orderReducer';

import {
  orderNewReducer,
  initialState as DriverOrderNewState,
} from './reducers/driverOrderNew';

import { rootWatcher } from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  auth: AuthState,
  order: OrderState,
  cityInfo: InfoState,
  map: MapState,
  feedback: FeedbackState,
  orders: DriverOrderNewState,
};

export const history = createBrowserHistory();
const browserMiddleware = routerMiddleware(history);

const reducers = (history: any) =>
  combineReducers({
    order: orderReducer,
    feedback: feedbackReducer,
    router: connectRouter(history),
    auth: authReducer,
    cityInfo: cityInfoReducer,
    map: mapReducer,
    orders: orderNewReducer,
  });

const rootReducers = reducers(history);

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, browserMiddleware)),
);

export type RootState = ReturnType<typeof rootReducers>;

sagaMiddleware.run(rootWatcher);

export default store;
