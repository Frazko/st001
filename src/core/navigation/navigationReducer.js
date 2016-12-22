import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const NavState = new Record({
	title: false
});


export function navigationReducer(state = new NavState(), action) {
	switch (action.type) {
		case types.NAV_BAR_TITLE_CHANGE_SUCCESS:
		// console.log('*****<>***    nav title', action.title);
			return Object.assign({}, state, {
				title: action.title
			});
		default:
		return state;
	}
}