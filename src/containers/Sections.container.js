import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userDataActions from '../core/collectionsData/dataActions';
import { windowResize, navigateTo,mergeFriends } from '../utils';
import Section from '../components/Section.component';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';

const styles = {
	root: {
		textAlign: 'center',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
        //background:'#FFAAAA',
    },
    gridList: {
    	width: '100%',
    	overflowY: 'auto',
    	height: windowResize() - 50,
    },
};

class Sections extends Component {

	constructor(props) {
		super(props);
		this.state = {
			collectionId:this.props.params.collection,
			collectionName:"",
			accountName:"",
		};
		// console.log("<<<<>>>>> ", this.state);
	}

	componentWillMount() {
		window.addEventListener('resize', () => this.updateDimensions(), true);

		// console.log(":: Sections::::: ", this.props.collections)
		let currentCollection = this.props.collections.filter((item, i) => item[this.state.collectionId])[0][this.state.collectionId]
		let sections = currentCollection.sections

		if(!currentCollection.friendsMerged){
			console.log(" ----------------- Merging Friends -----------------  ");

			currentCollection.friendsWithThisCollection.forEach((friend) => {

				console.log("This collection:: ", currentCollection.data.title, currentCollection.items, friend.items);
				mergeFriends(currentCollection.items, friend.items);
			});
		}
		currentCollection.friendsMerged = true;

		this.state.sections = sections;
		
		console.log("currentCollection",currentCollection);
		console.log("sections",sections);

		// 
		let totalItemsBySection = currentCollection.sections.map((sections,i) => currentCollection.items.filter((item) => {
			if(item.itemData){ 
				return item.itemData.section === i
			}
		}));
		console.log("LIST:::::: itemsBySection ", totalItemsBySection);

		let myItemsBySection = totalItemsBySection.map((section) => section.filter((item) => item.count));
		console.log("LIST:::::: myItemsBySection ", myItemsBySection);


		currentCollection.data.accountName = this.props.accountNames.filter((account) => account[currentCollection.data.account])[0][currentCollection.data.account];
		let collectionName = currentCollection.data.title;

		this.state.collectionName = collectionName;
		this.state.accountName=currentCollection.data.accountName;
		
		console.log("propss ", this.state.collectionName);

		currentCollection.data.totalItemsBySection = totalItemsBySection;
		currentCollection.data.myItemsBySection = myItemsBySection;





		// SAVING CURRENT COLLECTION TO STORE
		this.props.actions.saveCurrentCollection(currentCollection);


		this.setState({totalItemsBySection, myItemsBySection, currentCollection})
	}

	componentDidMount(){
		windowResize();
		this.updateDimensions();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions() {
		let newHeight = windowResize() - 140;
		this.setState({gridList:Object.assign({}, styles.gridList, {height: newHeight})})
	}



	render(){
		let collections = this.state.collections;

		return (<div 
			style={styles.root}>
			<h1 className="sectionsHeader"> {this.state.collectionName} </h1>
			<GridList
			cols={1}
			cellHeight={70}
			padding={1}
			style={this.state.gridList}
			>
			{this.state.sections.map((item, i) => (
				<div key={i}>
				<Section 
				id={i} 
				title={item}
				collection={this.state.collectionName}
				account={this.state.accountName}
				totalItemsBySection={this.state.totalItemsBySection[i].length}
				myItemsBySection={this.state.myItemsBySection[i].length}
				collectionId = {this.state.currentCollection.data.id}
				navigateTo = {navigateTo}

				/>

				<Divider inset={true} />
				</div>
				))}
			</GridList>

			</div>

			);
	}
}

function mapStateToProps(state, ownProps){
	return{
		collections: state.userCollections.collections,
		collectionNames: state.collectionsNames.collectionsNames,
		accountNames: state.accountsNames.accountNames,

	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(userDataActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sections);

