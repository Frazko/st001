import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const NewCollectionsState = new Record({
	newCollections:[]
});

export function newCollectionsReducer(state = new NewCollectionsState(), action) {
	switch (action.type) {
		case types.SAVE_NEW_COLLECTIONS_SUCCESS:
			// console.log("SAVE_NEW_COLLECTIONS_SUCCESS ",action.currentCollection);
			return Object.assign({}, state, {
				newCollections: action.newCollections
			});
			break;
		default:
		return state;
	}
}