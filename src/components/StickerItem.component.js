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
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
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
  index : {
    top:32,
    left:14,
    paddingTop:18,
    height: 50,
    width: 50,
    textAlign: 'center',
    margin:0,
  }  ,
  amount : {
    top:38,
    fontSize:42,
  }  ,
  listItem : {
    textAlign:'left',
  }  ,
  socialBlock : {
    position:'relative',
    textAlign:'left',
    display: 'inline-block',
    top:10,
    left:-14
  } ,
  socialBlockIcon : {
    padding:0,
    margin:0,
  } ,
  socialBlockSpan : {
    position:'relative',
    top:-6,
    margin:0,
  },
  block : {
    marginLeft:10,
  }
};   


class SectionItem extends Component {
  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
            


          <List>


            <ListItem
              className="listItemClass"
              leftAvatar={<Paper style={style.index} zDepth={2} circle={true} >142</Paper>}
              rightIcon={<div style={style.amount}>4</div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div>
                <h1>Club Nacional de Football team</h1>
              </div>
              <div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <FavoriteBorder />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 4</span>
                </div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 8</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />


            <ListItem
              className="listItemClass"
              leftAvatar={<Paper style={style.index} zDepth={2} circle={true} >142</Paper>}
              rightIcon={<div style={style.amount}>2</div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div>
                <h1>Club Nacional de Football team</h1>
              </div>
              <div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <FavoriteBorder />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 2</span>
                </div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 8</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />


            <ListItem
              className="listItemClass"
              leftAvatar={<Paper style={style.index} zDepth={2} circle={true} >142</Paper>}
              rightIcon={<div style={style.amount}>0</div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div>
                <h1>Club Nacional de Football team</h1>
              </div>
              <div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <FavoriteBorder />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 5</span>
                </div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 8</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />


            <ListItem
              className="listItemClass"
              leftAvatar={<Paper style={style.index} zDepth={2} circle={true} >142</Paper>}
              rightIcon={<div style={style.amount}>2</div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div>
                <h1>Club Nacional de Football team</h1>
              </div>
              <div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <FavoriteBorder />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 3</span>
                </div>
                <div style={style.socialBlock}>
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 7</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />
            

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