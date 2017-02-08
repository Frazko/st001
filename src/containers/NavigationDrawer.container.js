import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
// import RaisedButton from 'material-ui/RaisedButton';
import * as navigationActions from '../core/navigation/navigationActions';

// import { paths } from '../router/routes';

// import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ImageBurstMode from 'material-ui/svg-icons/image/burst-mode';
import Collections from 'material-ui/svg-icons/image/collections';
// import Assessment from 'material-ui/svg-icons/action/assessment';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import Home from 'material-ui/svg-icons/action/home';
// import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import AddStickers from '../components/AddStickers.component';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


const style = {
  paper: {
    display: 'block',
    margin: '16px 10px',
    overflow: 'hidden',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  avatar: {
    height: 80,
    width: 80,
    margin: '0 auto',
    display: 'block'
  },
  displayName: {
    fontSize: 24,
    lineHeight: '24px',
    margin: '16px auto',
    display: 'block',
    textAlign: 'center'

  },
  list: {
    color: '#000',
    fontSize: 24,
    paddingBottom: 25,
    background: 'none'
  },
  overlay: {
    background: 'none'
  },
};


class NavigationDrawer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  handleClose() {
    // console.log ("handleClose()")
    this.setState({ open: false });
  };


  navigateTo(target) {
    // console.log (target);
    browserHistory.push(target);
  }

  addStickers() {
    this.setState({ open: true });
  }
  render() {
    let {display} = this.props.menu
    let {authenticated, signOut} = this.props

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
              <div>
                <Avatar
                  style={style.avatar}
                  src={this.props.userData.photoURL || ""}
                />
                <span style={style.displayName}>
                  {this.props.userData.displayName}
                </span>
              </div>
            }>
            <img src="/images/common/landscape-avatar.jpg" />
          </CardMedia>

          <Menu >
            <MenuItem onTouchTap={() => this.navigateTo("/")} primaryText="Home" leftIcon={<Home />} />
            <MenuItem onTouchTap={() => this.addStickers()} primaryText="Add Stickers" leftIcon={<ImageBurstMode />} />
            <MenuItem onTouchTap={() => this.navigateTo("/myCollections")} primaryText="My Collections" leftIcon={<Collections />} />
            <MenuItem onTouchTap={() => this.navigateTo("/newCollections")} primaryText="Add New Collections" leftIcon={<Collections />} />
            {/*<MenuItem onTouchTap={() => this.navigateTo("/progress")}  primaryText="Progress" leftIcon={<Assessment />} />*/}
            <MenuItem primaryText="My Friends" leftIcon={<QuestionAnswer />} />
            <MenuItem onTouchTap={() => this.navigateTo("/messages")} primaryText="Messages" leftIcon={<QuestionAnswer />} />
          </Menu>

          <Divider inset={true} />

          <MenuItem onTouchTap={() => this.navigateTo("/settings")} >Settings</MenuItem>
          <MenuItem onTouchTap={() => this.navigateTo("/help")} >Help</MenuItem>
          {authenticated ? <MenuItem onTouchTap={signOut}>Log out</MenuItem> : null}
        </Drawer>

        <AddStickers
          visible={this.state.open}
          handleClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}


NavigationDrawer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

NavigationDrawer.propTypes = {
  authenticated: React.PropTypes.bool.isRequired,
  signOut: React.PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
  // console.log(">>>>>>>>> state drawer", state.auth.data);
  return {
    menu: state.menu,
    userData: state.auth.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(navigationActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);