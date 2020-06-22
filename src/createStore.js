import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import promiseMiddleware from 'redux-promise';
import newsFeedReducer from './reducers/newsFeedReducer';
import searchTermReducer from './reducers/searchTermReducer';

export default (initialState = {}) => createStore(
  combineReducers({
    news: newsFeedReducer,
    searchTerm: searchTermReducer,
  }),
  initialState,
  applyMiddleware(promiseMiddleware),
);
