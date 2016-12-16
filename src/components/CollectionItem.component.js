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
//import * as sectionActions from '../actions/sectionActions.jsx';
 


const style = {

  backgroundPaper:{
    width: '100%',
    // textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,

    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  listItem : {
    textAlign:'left',
  },
  
  circularProgressSettings:{
    thickness:4,
    size: 40,
    circularProgressHolder:{
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height:'100%',
      top:0,
      thickness:4,
      // background:'#AAFFAA',
      size: 40
    },
    circularProgress:{
      background:'#e6e6ee',
      borderRadius: 50
    }
  },
  chevronHolder:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height:'100%',
    top:-12,
    // background:'#AAFFAA',
  }
};   

function circularProgressColor(){
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}

class CollectionItem extends Component {
  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
          

          <List>
            <ListItem
              leftAvatar={<div style={style.circularProgressSettings.circularProgressHolder}><CircularProgress
              mode="determinate"
              value={25}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              color={circularProgressColor()}
              /></div>}
              
              rightIcon={<div style={style.chevronHolder}><ChevronRight /></div>}
              primaryText={"FIFA 365 STICKER ALBUM 2017"}
              secondaryText={"PANINI, 2017"}
              style={style.listItem}
            />

            
{/*
            <Divider inset={true} />
            
            <ListItem
              leftAvatar={<div style={style.circularProgressSettings.circularProgressHolder}><CircularProgress
              mode="determinate"
              value={50}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              color={circularProgressColor()}
              /></div>}
              rightIcon={<div style={style.chevronHolder}><ChevronRight /></div>}

              primaryText="DREAMWORKS TROLLS STICKERALBUM"
              secondaryText={"TOPPS, 2016"}
              style={style.listItem}
            />

            <Divider inset={true} />
            
            <ListItem
              leftAvatar={<div style={style.circularProgressSettings.circularProgressHolder}><CircularProgress
              mode="determinate"
              value={100}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              color={circularProgressColor()}
              /></div>}
              rightIcon={<div style={style.chevronHolder}><ChevronRight /></div>}
              
              primaryText={"NBA STICKER COLLECTION 2016/2017 - EUROPEAN VERSION "}
              secondaryText={"PANINI, 2016"}
              style={style.listItem}
            />

            <Divider inset={true} />

            <ListItem
              leftAvatar={<div style={style.circularProgressSettings.circularProgressHolder}><CircularProgress
              mode="determinate"
              value={40}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              color={circularProgressColor()}
              /></div>}
              rightIcon={<div style={style.chevronHolder}><ChevronRight /></div>}
              
              primaryText={"WWE SLAM ATTAX - TAKEOVER"}
              secondaryText={"TOPPS, 2015"}
              style={style.listItem}
            />

            <Divider inset={true} />

            <ListItem
              leftAvatar={<div style={style.circularProgressSettings.circularProgressHolder}><CircularProgress
              mode="determinate"
              value={85}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              color={circularProgressColor()}
              /></div>}
              rightIcon={<div style={style.chevronHolder}><ChevronRight /></div>}
              
              primaryText={"SPANISH LIGA 2016/2017 - MEGACRACKS"}
              secondaryText={"PANINI, 2016"}

              style={style.listItem}
            />
*/}
          </List>




        </Paper>
      </div>
    );
  }
}

CollectionItem.propTypes = {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);