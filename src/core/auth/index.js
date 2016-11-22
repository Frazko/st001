import { firebaseAuth } from 'src/core/firebase';
import * as authActions from './actions';

// import userData from './MockUserData';


export { authActions };
export * from './action-types';
export { authReducer } from './reducer';
export { getAuth, isAuthenticated } from './selectors';


export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
  	const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        //console.log("user",JSON.stringify(user, null, 2));
        dispatch(authActions.initAuth(user));
        unsub();
        resolve();
      },
      error => reject(error)
    );
    // console.log("user",JSON.stringify(userData, null, 2));
    //dispatch(authActions.initAuth(userData));
    //resolve();
  });
}
