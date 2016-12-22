import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const MenuState = new Record({
	display: false
});


export function menuReducer(state = new MenuState(), action) {
	switch (action.type) {
		case types.TOGGLE_DRAWER_OVERLAY_SUCCESS:
			return Object.assign({}, state, {
				display: !state.display
			});
		default:
		return state;
	}
}