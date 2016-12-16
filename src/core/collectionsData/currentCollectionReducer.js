import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const CurrentCollectionState = new Record({
	currentCollection:[]
});

export function currentCollectionReducer(state = new CurrentCollectionState(), action) {
	switch (action.type) {
		case types.SAVE_CURRENT_COLLECTION_SUCCESS:
			// console.log("SAVE_CURRENT_COLLECTION_SUCCESS ",action.currentCollection);
			return Object.assign({}, state.currentCollection, {
				currentCollection: action.currentCollection
			});
			break;
		default:
		return state;
	}
}