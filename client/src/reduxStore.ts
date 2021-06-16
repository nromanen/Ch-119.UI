import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, initialState as AuthState } from './reducers/authReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './sagas/index';

const initialState = {
  auth: AuthState,
};

const sagaMiddleware = createSagaMiddleware();

const redusers = combineReducers({
  auth: authReducer,
});

const store = createStore(
    redusers,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootWatcher);

export default store;
