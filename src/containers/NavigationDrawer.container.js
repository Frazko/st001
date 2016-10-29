import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import * as navigationActions from '../core/navigation/navigationActions';

class NavigationDrawer extends React.Component {

  constructor(props) {
    super(props);
    console.log("<>",props)
  }
  componentWillMount(){
    this.setState({open: false})

  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});
  requestChange = () => console.log('request');

  render() {

    let {display} = this.props.navigation

    return (
      <div>
        <RaisedButton
          label="Open Drawer"
          onTouchTap={this.handleToggle}
        />

        <Drawer
          docked={!display}
          width={300}
          open={display}
          onRequestChange={this.props.actions.toggleDrawer}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}





function mapStateToProps(state, ownProps){
  console.log(">>>>>>>>> state drawer",state);
  return{
    navigation: state.navigation
  }
}


function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(navigationActions, dispatch)
  }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);