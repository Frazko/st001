import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import Collection from '../components/Collection.component';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {getCollections} from "../core/firebase/firebaseData"
import { windowResize } from '../utils';


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


class Collections extends Component {

	constructor(props) {
		super(props);
		this.state = {collections: []};
	}

	componentDidMount(){
		windowResize();
		this.updateDimensions();
	}

	componentWillReceiveProps(nextProps){
		console.log("will receive ", nextProps);
	}

	componentWillMount() {
		getCollections(this.props.userData.providerData[0].uid).then(values => {
			this.setState({collections: values});
		});

		window.addEventListener('resize', () => this.updateDimensions(), true);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions() {
		let newHeight = windowResize() - 50;
		this.setState({gridList:Object.assign({}, styles.gridList, {height: newHeight})})
		// console.log(this.state.gridList);
	}

	render(){
		console.log("***********   Render ************");
		let collections = this.state.collections;
		console.log('this.state.collections::::::::: ',collections);
		return (<div 
					style={styles.root}>
					<GridList
					cols={1}
					cellHeight={320}
					padding={1}
					style={this.state.gridList}
					>
					{this.state.collections.map((item) => (
						<Collection key={Object.keys(item)[0]} 
						title={item[Object.keys(item)[0]].data.title}
						totalItems={item[Object.keys(item)[0]].data.totalItems}
						year={item[Object.keys(item)[0]].data.year}
						thumbnail={item[Object.keys(item)[0]].data.thumbnail['400x400']}
						published={item[Object.keys(item)[0]].data.published}
						account={item[Object.keys(item)[0]].data.account}
						iHave={item[Object.keys(item)[0]].iHave}
						iChange={item[Object.keys(item)[0]].iChange}
						/>
						))}
					</GridList>
				</div>

			);
	}
}



function mapStateToProps(state, ownProps) {
    // console.log(">>>>>>>>> state collection", state.auth.data);
    return {
    	userData: state.auth.data
    }
}


function mapDispatchToProps(dispatch) {
	return {
        //actions: bindActionCreators(navigationActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Collections);
