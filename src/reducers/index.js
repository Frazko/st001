import {combineReducers} from 'redux';
import courses from './courseReducer.jsx';

export const rootReducer = combineReducers({
	courses
});


export default rootReducer;