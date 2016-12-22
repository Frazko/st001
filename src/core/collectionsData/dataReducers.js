import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const UserCollectionsState = new Record({
	collections: []
});


export function userCollectionsDataReducer(state = new UserCollectionsState(), action) {
	switch (action.type) {
		case types.SAVE_USER_COLLECTIONS_DATA_SUCCESS:
			// console.log("SAVE_USER_COLLECTIONS_DATA_SUCCESS ",action.collections);
			return Object.assign({}, state, {
				collections: action.collections
			});
			break;
		default:
		return state;
	}
}