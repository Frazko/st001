import React, { Component } from 'react';
import { Link } from 'react-router';

class Sections extends Component {
	render(){
		var id=":v";
		if (this.props.params.id){
			id = this.props.params.id;
		}
		console.log(id);
		return (
			<div>
				<h1>Sections Page {id}</h1>

				<Link to={"/collections"}
				key='1'>
				collections
				</Link>
			
			</div>);
	}
}

export default Sections