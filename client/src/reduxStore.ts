import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, initialState as UserState } from './reducers/userReducer';

const initialState = {
  user: UserState,
};

const redusers = combineReducers({
  user: userReducer,
});

const store = createStore(
    redusers,
    initialState,
    composeWithDevTools(applyMiddleware()),
);

export default store;
