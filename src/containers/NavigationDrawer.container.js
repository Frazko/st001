import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import * as navigationActions from '../core/navigation/navigationActions';

import FacebookButton from '../components/FacebookButton';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ImageBurstMode from 'material-ui/svg-icons/image/burst-mode';
import Collections from 'material-ui/svg-icons/image/collections';
import Assessment from 'material-ui/svg-icons/action/assessment';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import Home from 'material-ui/svg-icons/action/home';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


const style = {
  paper: {
    display: 'block',
    margin: '16px 10px',
    overflow:'hidden',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  list: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 25,
    background:'none'
  },
  overlay: {
    background:'none'
  },
};


class NavigationDrawer extends React.Component {

  constructor(props) {
    super(props);
    // console.log("<>",props)
  }
  componentWillMount(){
    this.setState({open: false})
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});
  requestChange = () => console.log('request');

        // <div><FacebookButton fb={FB} /> FB </div>
  render() {

    let {display} = this.props.navigation
    let {authenticated,signOut} = this.props

    return (
      <div>
        <Drawer
          docked={!display}
          width={260}
          open={display}
          onRequestChange={this.props.actions.toggleDrawer}
        >






          <CardMedia
          overlayContentStyle={style.overlay}
          overlay={
            <ListItem
              style={style.list}
              disabled={true}
              leftAvatar={
                <Avatar src="images/common/avatar.jpg" />
              }>

              Fran Murillo
            </ListItem>
          }>
            <img src="images/common/landscape-avatar.jpg" />
          </CardMedia>

          <Paper style={style.paper}>
            <Menu >
              <MenuItem primaryText="Home" leftIcon={<Home />} />
              <MenuItem primaryText="Add Stickers" leftIcon={<ImageBurstMode />} />
              <MenuItem primaryText="My Collections" leftIcon={<Collections />} />
              <MenuItem primaryText="Progress" leftIcon={<Assessment />} />
              <MenuItem primaryText="Messages" leftIcon={<QuestionAnswer />} />
            </Menu>
          </Paper>

          <Divider inset={true} />

          <MenuItem onTouchTap={this.props.actions.toggleDrawer}>Settings</MenuItem>
          <MenuItem onTouchTap={this.props.actions.toggleDrawer}>Help</MenuItem>
          {authenticated ? <MenuItem onTouchTap={signOut}>Log out</MenuItem>: null}
        </Drawer>
      </div>
    );
  }
}


// NavigationDrawer.propTypes = {
//   authenticated: React.PropTypes.bool.isRequired,
//   signOut: React.PropTypes.func.isRequired
// };

function mapStateToProps(state, ownProps){
  // console.log(">>>>>>>>> state drawer",state);
  return{
    navigation: state.navigation,
    authenticated:state.navigation,
    signOut:state.signOut,
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(navigationActions, dispatch)
  }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);