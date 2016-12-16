import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Label from 'material-ui/svg-icons/action/label';
//import * as sectionActions from '../actions/sectionActions.jsx';
 
import * as colors from '../constants/Colors.constants.js';

const style = {
  backgroundPaper:{
    width: '100%',
    textAlign: 'center',
    borderRadius: 6,
  },

  picHolder : {
    top:0,
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height:'100%',
    // background:'#FFAAAA',
  },
  pic : {
    height: 60,
    width: 60,
  },
  listItem : {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 100,
    // background:'#FFFFAA',
    // border: 'solid 1px #0000AA ',
  },
  block : {
    marginLeft:15,
    textAlign:'right',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end', 
    // background:'#AAFFFF',
  },

  blockTitle:{
  }
};   


class LikesItem extends Component {
  render() {
    return (
      <div>
            
          <List>

            <ListItem
              leftAvatar={<div style={style.picHolder}><Avatar style={style.pic} src="/images/common/avatar4.png" /></div>}
              style={style.listItem} 
              >
              <div style={style.block}>
              <div style={style.blockTitle}>
                <h1>Suarez Messi</h1>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />




            <ListItem
              leftAvatar={<div style={style.picHolder}><Avatar style={style.pic} src="/images/common/avatar2.jpg" /></div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div style={style.blockTitle}>
                <h1>Suarez-Messi-Neymar-Jordi Alba</h1>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />




            <ListItem
              leftAvatar={<div style={style.picHolder}><Avatar style={style.pic} src="/images/common/avatar3.png" /></div>}
              style={style.listItem}>
              <div style={style.block}>
              <div style={style.blockTitle}>
                <h1>Huang Bowen / Gao Lin / Ricardo Goulart</h1>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />




            <ListItem
              leftAvatar={<div style={style.picHolder}><Avatar style={style.pic} src="/images/common/avatar.jpg" /></div>}
              style={style.listItem}>
              <div style={style.block}>
                <div style={style.blockTitle}>
                  <h1>Osmar Mares / José Guerrero / Rubens Sambuesa / Francisco Murillo / Cantinflas / Machillo Ramirez</h1>
                </div>
              </div>
            </ListItem>
            <Divider inset={true} />
            

          </List>




      </div>
    );
  }
}

LikesItem.propTypes = {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(LikesItem);