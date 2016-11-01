import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';
import DataUsage from 'material-ui/svg-icons/device/data-usage';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
//import * as sectionActions from '../actions/sectionActions.jsx';
 


const style = {
  title:{
    padding:10,
    fontWeight:'bold'
  },

  backgroundPaper:{
    height: 380,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
  },

  image:{
    height: 140,
    width: 150,
    marginLeft:20,
    marginTop:15,
  },

  imageHolder:{
    float:'left',
    //background:'#336699',
  },

  infoHolder:{
    float:'right',
    //background:'#996633',
  },

  infoItem:{
    marginLeft:0,
    marginRight:0,
    padding:0,
  },

  infoIcon:{
    marginLeft:20,
    //marginRight:0,
    padding:0,
  },

  description:{
    margin:20,
    //marginRight:0,
    padding:0,
  },

  footer:{
    fontSize:12,
    lineHeight: 1,
    paddingTop:2,
    paddingLeft:15,
    paddingRight:15,
    textAlign: 'left',
  }
};   


class Collection extends Component {
  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
            

          <div style={style.title}>
            Copa America Centenario 2016
          </div>
          <Divider inset={false} />

          <div style={style.imageHolder}>
            <img style={style.image} src="images/albums/00001/copamecen20116.jpg" />
          </div>

          <List style={style.infoHolder}>
            <ListItem style={style.infoItem} primaryText="432" leftIcon={<Search style={style.infoIcon} />} />
            <ListItem style={style.infoItem} primaryText="42" leftIcon={<LabelOutline style={style.infoIcon} />} />

        <CircularProgress
          mode="determinate"
          value={60}
          size={40}
          thickness={3}
        />

          </List>


          <div style={style.description}>
            <RaisedButton label="Sections" fullWidth={true} />
          </div>
          <div style={style.description}>
            <span>Stickers: {490}, </span>
            <span>Panini </span>
            <span>2016</span>
          </div>


          <Divider inset={false} />

          <div style={style.footer}>
            <p >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend scelerisque viverra. Nam elementum mollis volutpat. Aliquam id sapien quis justo pharetra bibendum.
            </p>
          </div>
        </Paper>
      </div>
    );
  }
}

Collection.propTypes = {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(Collection);