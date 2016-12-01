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
    height: 550,
    overflowY: 'auto',
  },
};

class Collections extends Component {

  constructor(props) {
      super(props);
  }

  componentWillMount() {
      //TODO:: get collections
      // console.log(">>>>>>>>> componentWillMount:::  ", this.props.userData);
      getCollections(this.props.userData.providerData[0].uid);
  }

	render(){
		return (<div 
				style={styles.root}>
				    <GridList
				      cols={1}
				      cellHeight={400}
				      padding={1}
				      style={styles.gridList}
				    >
				      {[0,1,2].map((tile) => (
				        <Collection key={tile}/>
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
