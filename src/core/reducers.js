import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { menuReducer } from './navigation/menuReducer';
import { navigationReducer } from './navigation/navigationReducer';
import { userCollectionsDataReducer } from './collectionsData/dataReducers';
import { collectionsNamesReducer } from './collectionsData/collectionsNamesReducers';
import { accountsNamesReducer } from './collectionsData/accountsNamesReducers';
import { currentCollectionReducer } from './collectionsData/currentCollectionReducer';

export default combineReducers({
  auth: authReducer,
  menu: menuReducer,
  nav: navigationReducer,
  routing: routerReducer,
  userCollections: userCollectionsDataReducer,
  collectionsNames: collectionsNamesReducer,
  accountsNames: accountsNamesReducer,
  currentCollection: currentCollectionReducer
});
