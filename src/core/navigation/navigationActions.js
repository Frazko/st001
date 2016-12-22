import * as types from './actionTypes';


export function toggleDrawerSuccess() {
    return {
        type: types.TOGGLE_DRAWER_OVERLAY_SUCCESS
    };
}

export function toggleDrawer() {
    return function(dispatch) {
        dispatch(toggleDrawerSuccess());
    };
}




export function navBarTitleUpdateSuccess(title) {
    // console.log('2 ********    navBarTitleUpdateSuccess', title);
    return {
        type: types.NAV_BAR_TITLE_CHANGE_SUCCESS,
        title
    };
}

export function navBarTitleUpdate(title) {
    // console.log('1 ********    navBarTitleUpdate', title);
    return function(dispatch) {
        dispatch(navBarTitleUpdateSuccess(title));
    };
}
