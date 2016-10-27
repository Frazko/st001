import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses){
	return {
		type:types.LOAD_COURSES_SUCCESS, courses
	};
};

export function loadCourses(){
	console.log('loadCourses');
	return function (dispatch){
		return courseApi.getAllCourses().then(courses => {
			console.log(' getAllCourses().then: ', courses);
			dispatch(loadCoursesSuccess(courses));
		}).catch(error => {
			throw(error);
			// ::BestPractice:: create loadCoursesError function
		})
	}

}