import firebase from 'firebase';
import { firebaseAuth } from '../firebase';
import  * as UserManager  from './FirebaseUserManager';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';


function authenticate(provider) {
  provider.addScope('user_friends, public_profile, email, user_birthday, user_location');
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then((result) => {
        dispatch(signInSuccess(result));
        UserManager.createUser(result);
      })
      .catch(error => dispatch(signInError(error)));
  };
}

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function signInSuccess(result) {
  console.log("sing in success");
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}


export function signInWithGithub() {
  return authenticate(new firebase.auth.GithubAuthProvider());
}


export function signInWithGoogle() {
  return authenticate(new firebase.auth.GoogleAuthProvider());
}


export function signInWithTwitter() {
  return authenticate(new firebase.auth.TwitterAuthProvider());
}

export function signInWithFacebook() {
  return authenticate(new firebase.auth.FacebookAuthProvider());
}

export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}
