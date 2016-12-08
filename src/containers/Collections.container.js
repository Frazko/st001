import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import Collection from '../components/Collection.component';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {getCollections} from "../core/firebase/firebaseData"


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
    height: '100%',
    overflowY: 'auto',

  },
};

class Collections extends Component {

	constructor(props) {
	    super(props);
	    // this.setState({collections: null});
	    this.state = {collections: []};
	}

	componentWillReceiveProps(nextProps){
	    	console.log("will receive ", nextProps);
	}

	componentWillMount() {
	    getCollections(this.props.userData.providerData[0].uid).then(values => {
	    	this.setState({collections: values});
	    });
	}

	render(){
		console.log("Render");
		let collections = this.state.collections;
		console.log('this.state.collections::::::::: ',collections);
		return (<div 
				style={styles.root}>
				    <GridList
				      cols={1}
				      cellHeight={320}
				      padding={1}
				      style={styles.gridList}
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
