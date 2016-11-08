import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';


import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import SectionItem from '../components/SectionItem.component';
import StickerItem from '../components/StickerItem.component';

import SignIn from '../containers/signIn';

//import * as sectionActions from '../actions/sectionActions.jsx';
 


const style = {

  backgroundPaper:{
    width: '100%',
    height: 640,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
    useSelect: 'none',
    MozUserSelect:'none',
    WebkitUserSelect:'none',
    msUserSelect:'none',
    flex: 1,
    backgroundSize: 'cover',
    backgroundImage: 'url(../images/common/bg-login.jpg)',
  },

  block : {
    // background:'#AAAAFF',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    height:'100%',
    color: '#FFFFFF',
  },

  stickerHeader : {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height:'100%', 
    width:'100%', 

  },

  avatarHolder : {
    // background:'#AAAAFF',
    margin:50,

  },

  avatar : {
    width: 160,
    height: 160,
    border: '4px solid white',
    borderRadius: 100,
  },

  appName : {
    fontWeight:'bold',
    fontSize:22,
  },

  loginBtns : {

  },

}; 



class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
          <div style={style.block}>
            <div style={style.avatarHolder}>
              <Avatar style={style.avatar}src="images/common/main-logo.jpg" />
              <div style={style.appName}>
                <span>Collections Manager</span>
              </div>
            </div>
            <div style={style.loginBtns}>
              <SignIn/>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
}
 
function mapStateToProps(state, ownProps){
  return{
    //courses: state.courses
  }
}

function mapDispatchToProps(dispatch){
  return {
    //actions: bindActionCreators(sectionActions, dispatch)
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);