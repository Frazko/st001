import React,{PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as courseActions from '../actions/courseActions.jsx';
import CourseList from './CourseList';


class CoursesPage extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'CoursesPage';
	}

	courseRow(course, index){
		return <div key={index}>{course.title}</div>;
	}

	render() {
		const {courses} = this.props;

		return (
			<div>
				<h1>Courses</h1> 
				<CourseList courses={courses}/>
			</div>
			);
	}
}

CoursesPage.propTypes = {
	actions:  PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
	console.log('state2props', state.courses)
	return{
		courses: state.courses
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(courseActions, dispatch)
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);
