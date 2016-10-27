import "./styles/style.scss";
import Root from './router/Root.router.js';

import configureStore from './store/configureStore.jsx' 
import {loadCourses} from './actions/courseActions.jsx';

const store = configureStore();
store.dispatch(loadCourses());

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(<Root store={store}/>, 
	document.getElementById('container'));
