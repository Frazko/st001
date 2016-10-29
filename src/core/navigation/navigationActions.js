import * as types from './actionTypes';

export function displayDrawerSuccess(open){
	console.log('displayDrawer '+open);
	return {
		type:types.DISPLAY_DRAWER_OVERLAY_SUCCESS, open
	};
}

export function toggleDrawerSuccess(){
	return {
		type:types.TOGGLE_DRAWER_OVERLAY_SUCCESS
	};
}

export function displayDrawer(){
	return function (dispatch){
		dispatch(displayDrawerSuccess(true));
	};
} 

export function toggleDrawer(){
	return function (dispatch){
		dispatch(toggleDrawerSuccess(true));
	};
} 