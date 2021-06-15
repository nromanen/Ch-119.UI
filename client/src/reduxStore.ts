import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, initialState as UserState } from './reducers/userReducer';
import { infoReducer, initialState as InfoState } from './reducers/infoReducer';
import {
  feedbackReducer,
  initialState as FeedbackState,
} from './reducers/feedbackReducer';

import {
  orderReducer,
  initialState as OrderState,
} from './reducers/orderReducer';
import { rootWatcher } from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  user: UserState,
  order: OrderState,
  info: InfoState,
  feedback: FeedbackState,
};

const redusers = combineReducers({
  user: userReducer,
  order: orderReducer,
  info: infoReducer,
  feedback: feedbackReducer,
});

const store = createStore(
  redusers,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof redusers>;

export default store;
