import React, { Component } from 'react';
import { Link } from 'react-router';

class Collections extends Component {
	render(){
		return (<div>
			<h1>Collections Page {this.props.params.id}</h1>

			<ul>
			<li>
			<Link to={"/sections/frz"}
			key='1'>
			section / frz
			</Link>
			</li>

			<li>
			<Link to={"/sections/2"}
			key='2'>
			section / 2
			</Link>
			</li>

			<li>
			<Link to={"/sections/3"}
			key='3'>
			section / 3
			</Link>
			</li>

			<li>
			<Link to={"/sections"}
			key='4'>
			sections
			</Link>
			</li>
			</ul>
			</div>);
	}
}

export default Collections;