import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const CollectionsNamesState = new Record({
	collectionNames:[]
});

export function collectionsNamesReducer(state = new CollectionsNamesState(), action) {
	switch (action.type) {
		case types.SAVE_COLLECTIONS_NAMES_SUCCESS:
			// console.log("SAVE_COLLECTIONS_NAMES_SUCCESS ",action.names);
			return Object.assign({}, state.collectionNames, {
				collectionNames: action.names
			});
			break;
		default:
		return state;
	}
}