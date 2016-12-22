import React from 'react'; 
import { isAuthenticated } from 'src/core/auth';

import App from             '../App';
import Login from           '../components/Login.component';
import Dashboard from       '../containers/Dashboard.container';
import NewCollections from  '../containers/NewCollections.container';
import Collections from     '../containers/Collections.container';
import Sections from        '../containers/Sections.container';
import Items from           '../containers/Items.container';
import ItemDetails from     '../containers/ItemDetails.container';



export const paths = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    DASHBOARD: '/',
    MY_COLLECTIONS: '/myCollections',
    NEW_COLLECTIONS: '/newCollections',
    SECTIONS:   '/:collection', 
    ITEMS:      '/:collection/:section', 
    DETAIL:     '/:collection/:section/:item', 
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
            replace(paths.DASHBOARD);
        }
    };
};

//  ------------------  !IMPORTANT  route changes in App.js

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
            path: paths.NEW_COLLECTIONS,
            component: NewCollections,
            onEnter: requireAuth(getState)
        }, {
            path: paths.MY_COLLECTIONS,
            component: Collections,
            onEnter: requireAuth(getState)
        }, {
            path: paths.SECTIONS,
            component: Sections,
            onEnter: requireAuth(getState)
        }, {
            path: paths.ITEMS,
            component: Items,
            onEnter: requireAuth(getState)
        }, {
            path: paths.DETAIL,
            component: ItemDetails,
            onEnter: requireAuth(getState)
        }
        ]
    };
};
