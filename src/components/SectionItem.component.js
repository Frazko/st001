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
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
  }
  ,
  circularProgressSettings:{
    thickness:4,
    size: 40,
    circularProgress:{
      background:'#e6e6ee',
      borderRadius: 50
    }
  }
};   


class SectionItem extends Component {
  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
            


          <List>


            <ListItem
              leftAvatar={<CircularProgress
              mode="determinate"
              value={5}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              />}
              
              rightIcon={<ChevronRight />}
              primaryText="FIFA 365 STICKER ALBUM 2017"
              secondaryText="PANINI, 2017"
            />

            <Divider inset={true} />
            
            <ListItem
              leftAvatar={<CircularProgress
              mode="determinate"
              value={90}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              />}

              rightIcon={<ChevronRight />}
              primaryText="DREAMWORKS TROLLS STICKERALBUM"
              secondaryText={"TOPPS, 2016"}
            />

            <Divider inset={true} />
            
            <ListItem
              leftAvatar={<CircularProgress
              mode="determinate"
              value={30}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              />}
              
              rightIcon={<ChevronRight />}
              primaryText="NBA STICKER COLLECTION 2016/2017 - EUROPEAN VERSION "
              secondaryText="PANINI, 2016"
            />

            <Divider inset={true} />

            <ListItem
              leftAvatar={<CircularProgress
              mode="determinate"
              value={60}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              />}
              
              rightIcon={<ChevronRight />}
              primaryText="WWE SLAM ATTAX - TAKEOVER"
              secondaryText="TOPPS, 2015"
            />

            <Divider inset={true} />

            <ListItem
              leftAvatar={<CircularProgress
              mode="determinate"
              value={10}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              />}
              
              rightIcon={<ChevronRight />}
              primaryText="SPANISH LIGA 2016/2017 - MEGACRACKS"
              secondaryText="PANINI, 2016"
            />

          </List>




        </Paper>
      </div>
    );
  }
}

SectionItem.propTypes = {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(SectionItem);