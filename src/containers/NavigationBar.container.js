import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as navigationActions from '../core/navigation/navigationActions';
import AppBar from 'material-ui/AppBar';

const iconStyles = {
  marginTop: 20
};

const iconButtonStyles = {
  marginTop: 8
};

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.check= ()=>console.log("clicked");
  }


  render() {
    return (
      <AppBar title="Title" onLeftIconButtonTouchTap={this.props.actions.toggleDrawer}>
        <IconButton style={iconButtonStyles} onClick={this.check.bind(this)}><MoreVertIcon color="white"/></IconButton>
        <IconButton style={iconButtonStyles} ><NavigationClose color="#ffffff"/></IconButton>
      </AppBar>
      )
  }
}

function mapStateToProps(state, ownProps){
  console.log(">>>>>>>>> sTATE navbar",state);
  return{
    //navigation: state.Navigation
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(navigationActions, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
