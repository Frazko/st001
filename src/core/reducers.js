import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { navigationReducer } from './navigation/navigationReducers';

export default combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  routing: routerReducer
});
