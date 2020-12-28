import reducer from 'reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import apiMiddleware from '../middleware/api';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk, apiMiddleware))
);
export default store;

export type StoreState = ReturnType<typeof reducer>;
