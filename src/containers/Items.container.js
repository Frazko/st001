import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { GridList } from 'material-ui/GridList';
import { windowResize, navigateTo } from '../utils';
import Item from '../components/Item.component';
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

class Items extends Component {
	constructor(props) {
		super(props);
		console.log ("Items ");
		this.state = {
			items: [],
		};
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	componentDidMount() {
		// console.log ("componentDidMount")
		windowResize();
		this.updateDimensions();
	}

	componentWillMount() {
		console.log ("Items - componentWillMount");
		// // console.log ('--- this.props.currentCollection', this.props.currentCollection);


		if (this.props.currentCollection.length === 0) {
			// console.log ('>>   roooooot');
			navigateTo('/');
			return;
		}
		// debugger
		window.addEventListener('resize', this.updateDimensions);

		this.state.items = this.props.currentCollection.data.totalItemsBySection[this.props.params.section]; //
		this.state.collectionId = this.props.currentCollection.data.id;
		this.state.collectionTitle = this.props.currentCollection.data.title;
		this.state.sectionId = this.props.params.section;
		this.state.sectionTitle = this.props.currentCollection.sections[this.props.params.section];

	}

	componentWillUnmount() {
		this.state.componentIsMounted = false;
		// console.log ("items componentWillUnmount")
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions() {
		// console.log ('Items :: updateDimensions mounted:');
		let newHeight = windowResize() - 140;
		this.setState({ gridList: Object.assign({}, styles.gridList, { height: newHeight }) })
	}


	render() {

		var collection = this.props.params.collection;
		var section = this.props.params.section;

		return (<div
			style={styles.root}>
			<h1 className="sectionsHeader"> {this.state.sectionTitle} </h1>
			<GridList
				cols={1}
				cellHeight={95}
				padding={1}
				style={this.state.gridList}
			>
				{this.state.items.map((item, i) => (
					<div key={i}>
						<Item
							id={i}
							title={item.itemData.title}
							itemNumber={item.itemData.number}
							collection={this.state.collectionTitle}
							collectionid={collection}
							sectionId={section}
							count={item.count || 0}
							iLike={item.like}
							owners={item.owners || 0}
							likes={item.likes || 0}
							navigateTo={navigateTo}



						/>

						<Divider inset={true} />
					</div>
				))}
			</GridList>

		</div>);
	}
}

function mapStateToProps(state, ownProps) {
	// console.log (">> currentCollection props", state.currentCollection)
	return {
		currentCollection: state.currentCollection.currentCollection
	}
}

function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(sectionActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
