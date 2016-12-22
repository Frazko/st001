import { Record } from 'immutable';
import * as types from './actionTypes.js';

export const AccountsNamesState = new Record({
	accountNames:[]
});


export function accountsNamesReducer(state = new AccountsNamesState(), action) {
	switch (action.type) {
		case types.SAVE_ACCOUNT_NAMES_SUCCESS:
			// console.log("SAVE_ACCOUNT_NAMES_SUCCESS ",action.names);
			return Object.assign({}, state, {
				accountNames: action.names
			});
			break;
		default:
		return state;
	}
}