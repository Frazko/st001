import * as types from './actionTypes';

export function saveUserDataSuccess(collections){
	 console.log("<<< Action >>> saveUserDataSuccess", collections);
	return {
		type:types.SAVE_USER_COLLECTIONS_DATA_SUCCESS, 
		collections
	};
}
export function saveUserData(collections){
	// console.log("<<< Action >>> saveUserData", collections);
	return function (dispatch){
		dispatch(saveUserDataSuccess(collections));
	};
} 



export function saveAlbumNamesSuccess(names){
	// console.log("<<< Action >>> saveAlbumNamesSuccess", names);
	return {
		type:types.SAVE_COLLECTIONS_NAMES_SUCCESS, 
		names
	};
}
export function saveAlbumNames(names){
	// console.log("<<< Action >>> saveAlbumNames", names);
	return function (dispatch){
		dispatch(saveAlbumNamesSuccess(names));
	};
} 



export function saveAccountNamesSuccess(names){
	// console.log("<<< Action >>> saveAccountNamesSuccess", names);
	return {
		type:types.SAVE_ACCOUNT_NAMES_SUCCESS, 
		names
	};
}
export function saveAccountNames(names){
	// console.log("<<< Action >>> saveUserData", collections);
	return function (dispatch){
		dispatch(saveAccountNamesSuccess(names));
	};
} 



export function saveCurrentCollectionSuccess(currentCollection){
	// console.log("<<< Action >>> saveAccountNamesSuccess", currentCollection);
	return {
		type:types.SAVE_CURRENT_COLLECTION_SUCCESS, 
		currentCollection
	};
}
export function saveCurrentCollection(currentCollection){
	// console.log("<<< Action >>> saveUserData", currentCollection);
	return function (dispatch){
		dispatch(saveCurrentCollectionSuccess(currentCollection));
	};
} 



export function saveNewCollectionsSuccess(newCollections){
	// console.log("<<< Action >>> saveNewCollectionsSuccess", newCollections);
	return {
		type:types.SAVE_NEW_COLLECTIONS_SUCCESS, 
		newCollections
	};
}
export function saveNewCollections(newCollections){
	// console.log("<<< Action >>> saveNewCollections", newCollections);
	return function (dispatch){
		dispatch(saveCurrentCollectionSuccess(newCollections));
	};
} 