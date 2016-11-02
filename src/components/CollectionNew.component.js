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

  backgroundPaper:{
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
  },

  title:{
    padding:10,
    fontWeight:'bold'
  },

  image:{
    height: 140,
    width: 150,
    marginLeft:20,
    marginTop:15,
  },

  description:{
    display:'block',
    margin:10,
    padding:0,
  },

  cta:{
    margin:20,
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


class CollectionNew extends Component {
  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
            

          <div style={style.title}>
            Copa Mundial Rusia 2018
          </div>

          <Divider inset={false} />

          <div style={style.imageHolder}>
            <img style={style.image} src="images/albums/00001/copamecen20116.jpg" />
          </div>



          <div style={style.description}>
            <span>Stickers: {650}, Panini 2018</span>
          </div>

          <div style={style.cta}>
            <RaisedButton label="Add to my Collections" fullWidth={true} />
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

CollectionNew.propTypes = {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(CollectionNew);