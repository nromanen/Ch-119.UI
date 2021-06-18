import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { infoReducer, initialState as InfoState } from './reducers/infoReducer';
import { authReducer, initialState as AuthState } from './reducers/authReducer';
import {
  feedbackReducer,
  initialState as FeedbackState,
} from './reducers/feedbackReducer';

import {
  orderReducer,
  initialState as OrderState,
} from './reducers/orderReducer';
import { rootWatcher } from './sagas/index';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const browserMiddleware = routerMiddleware(history);

const initialState = {
  order: OrderState,
  info: InfoState,
  feedback: FeedbackState,
  auth: AuthState,
};

const reducers = (history: any) =>
  combineReducers({
    order: orderReducer,
    info: infoReducer,
    feedback: feedbackReducer,
    router: connectRouter(history),
    auth: authReducer,
  });

const rootReducers = reducers(history);

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, browserMiddleware)),
);

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducers>;

export default store;
