import React from 'react';

import { isAuthenticated } from 'src/core/auth';

import App from '../App';
import Login from '../components/Login.component';
import Dashboard from '../containers/Dashboard.container';
import NewCollections from '../containers/NewCollections.container';
import Collections from '../containers/Collections.container';
import Sections from '../containers/Sections.container';
import Items from '../containers/Items.container';
import ItemDetails from '../containers/ItemDetails.container';
import UserDetail from '../containers/UserDetail.container';



export const paths = {
    ROOT:           '/',
    SIGN_IN:        '/sign-in',
    DASHBOARD:      '/',
    MY_COLLECTIONS: '/myCollections',
    NEW_COLLECTIONS:'/newCollections',

    USER:           '/user',
    USER_DETAIL:    '/user/:uid',

    COL:            '/col',
    COLLECTION:     '/col/:collection',
    SECTION:        '/col/:collection/:section',
    ITEM:           '/col/:collection/:section/:item',
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

const useChildren = (props) => <div>{props.children}</div>;
//  ------------------  !IMPORTANT  route changes in App.js

export const getRoutes = getState => {
    console.log('getState', getState);
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
            path: paths.COL,
            component: useChildren,
            onEnter: requireAuth(getState),
            childRoutes: [{
                path: paths.COLLECTION,
                component: Sections,
                onEnter: requireAuth(getState)
            },{
                path: paths.SECTION,
                component: Items,
                onEnter: requireAuth(getState)
            }, {
                path: paths.ITEM,
                component: ItemDetails,
                onEnter: requireAuth(getState)
            }]
        }, {
            path: paths.USER,
            component: useChildren,
            onEnter: requireAuth(getState),
            childRoutes: [{
                path: paths.USER_DETAIL,
                component: UserDetail,
                onEnter: requireAuth(getState)
            }]
        }]
    };
};
/*
const routes = {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
        { path: 'about', component: About },
        {
            path: 'inbox',
            component: Inbox,
            childRoutes: [{
                path: 'messages/:id',
                onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
            }]
        },
        {
            component: Inbox,
            childRoutes: [{
                path: 'messages/:id', component: Message
            }]
        }
    ]
}
*/