import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  ItemDetail  from '../components/ItemDetail.component'

class ItemDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		console.log("currentCollection",this.props.currentCollection);
		console.log("collection",this.props.params.collection)
		console.log("section",this.props.params.section)
		console.log("item",this.props.params.item)

		this.setState({currentCollection:this.props.currentCollection, currentItem:this.props.currentCollection.data.totalItemsBySection[this.props.params.section][this.props.params.item]})
	}



	render() {
		// console.log(".. ", this.props.params.collection, this.props.params.section, this.props.params.item);
		return (<div> 
			<ItemDetail 
			collectionTitle = {this.state.currentCollection.data.title}
			accountName = {this.state.currentCollection.data.accountName}
			section = {this.state.currentCollection.sections[this.props.params.section]}
			item={this.state.currentItem}
			/>
			</div> );
	}
}




function mapStateToProps(state, ownProps) {
	console.log("props", state.currentCollection)
	return {
		currentCollection: state.currentCollection.currentCollection,
	}
}

function mapDispatchToProps(dispatch) {
	return {
        //actions: bindActionCreators(sectionActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
