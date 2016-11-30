import { isAuthenticated } from 'src/core/auth';
import App from '../App';

import Login from '../containers/Login.container';
import Dashboard from '../containers/Dashboard.container';
import Collections from '../containers/Collections.container';
import Sections from '../containers/Sections.container';
import SectionItems from '../containers/SectionItems.container';

import React from 'react';


// const AUTH = (props) => < div > AUTH comp page < /div>; 

// const TASK = (props) => < div > TASK component page < /div>; 


export const paths = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    DASHBOARD: '/',
    MY_COLLECTIONS: '/myCollections',
    SECTIONS: '/sections/:collection', 
    SECTION: '/section/:Id', 
};


const requireAuth = getState => {
    // console.log("routes::requireAuth", getState());
    return (nextState, replace) => {
        // console.log("routes::requireAuth", !isAuthenticated(getState()));
        if (!isAuthenticated(getState())) {
            replace(paths.SIGN_IN);
        }
    };
};

const requireUnauth = getState => {
    return (nextState, replace) => {
        // console.log("routes::requireUnauth", isAuthenticated(getState()));
        if (isAuthenticated(getState())) {
            replace(paths.DASHBOARD);
        }
    };
};

//  ------------------  !IMPORTANT  rout changes in App.js

export const getRoutes = getState => {
    return {
        path: paths.ROOT,
        component: App,
        childRoutes: [{
            indexRoute: {
                component: Dashboard,
                onEnter: requireAuth(getState)
            }
        }, {
            path: paths.SIGN_IN,
            component: Login,
            onEnter: requireUnauth(getState)
        }, {
            path: paths.MY_COLLECTIONS,
            component: Collections,
            onEnter: requireAuth(getState)
        }, {
            path: paths.SECTIONS,
            component: Sections,
            onEnter: requireAuth(getState)
        }, {
            path: paths.SECTION,
            component: SectionItems,
            onEnter: requireAuth(getState)
        }
        ]
    };
};
