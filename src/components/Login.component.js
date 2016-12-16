import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Avatar from 'material-ui/Avatar';
import SignIn from '../containers/signIn';


const style = {

  backgroundPaper:{
    width: '100%',
    height: '100vh',
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
    zIndex:-100,
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



const Login = (props) => {
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

Login.propTypes = {
}
 
 
export default Login;