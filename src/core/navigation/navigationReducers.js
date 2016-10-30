import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const NavigationState = new Record({
	display: false
});


export function navigationReducer(state = new NavigationState(), action) {
	switch (action.type) {
		case types.DISPLAY_DRAWER_OVERLAY_SUCCESS:
			console.log("NAV display "+action.open);
			return Object.assign({}, state, {
				display: action.open
			});
		case types.TOGGLE_DRAWER_OVERLAY_SUCCESS:
			console.log("NAV toogle "+state);
			return Object.assign({}, state, {
				display: !state.display
			});
		default:
		return state;
	}
}