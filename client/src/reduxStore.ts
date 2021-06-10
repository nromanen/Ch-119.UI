import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer, initialState as UserState } from './reducers/userReducer';
import {
  orderReducer,
  initialState as OrderState,
} from './reducers/orderReducer';

const initialState = {
  user: UserState,
  order: OrderState,
};

const redusers = combineReducers({
  user: userReducer,
  order: orderReducer,
});

const store = createStore(
  redusers,
  initialState,
  composeWithDevTools(applyMiddleware()),
);

export type RootState = ReturnType<typeof redusers>;

export default store;
