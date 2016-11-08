import { isAuthenticated } from 'src/core/auth';
import App from '../App';

import Login from '../containers/Login.container';

import React from 'react';


const AUTH = (props) => < div > AUTH comp page < /div>; 

const TASK = (props) => < div > TASK component page < /div>; 


export const paths = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    TASKS: '/',
    NNEW: '/nnew'
};


const requireAuth = getState => {
    return (nextState, replace) => {
        if (!isAuthenticated(getState())) {
            replace(paths.SIGN_IN);
        }
    };
};

const requireUnauth = getState => {
    return (nextState, replace) => {
        if (isAuthenticated(getState())) {
            replace(paths.TASKS);
        }
    };
};


export const getRoutes = getState => {
    return {
        path: paths.ROOT,
        component: App,
        childRoutes: [{
            indexRoute: {
                component: TASK,
                onEnter: requireAuth(getState)
            }
        }, {
            path: paths.SIGN_IN,
            component: Login,
            onEnter: requireUnauth(getState)
        }, {
            path: paths.NNEW,
            component: AUTH,
            onEnter: requireAuth(getState)
        }]
    };
};
