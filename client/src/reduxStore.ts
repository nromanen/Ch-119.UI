import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, initialState as UserState } from './reducers/userReducer';
import {
  cityInfoReducer,
  initialState as InfoState,
} from './reducers/cityInfoReducer';
import { mapReducer, initialState as MapState } from './reducers/mapReducer';
import {
  orderReducer,
  initialState as OrderState,
} from './reducers/orderReducer';
import { rootWatcher } from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  user: UserState,
  order: OrderState,
  cityInfo: InfoState,
  map: MapState,
};

const redusers = combineReducers({
  user: userReducer,
  order: orderReducer,
  cityInfo: cityInfoReducer,
  map: mapReducer,
});

const store = createStore(
  redusers,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof redusers>;

export default store;
