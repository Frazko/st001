import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
// import {List, ListItem} from 'material-ui/List';
// import Search from 'material-ui/svg-icons/action/search';
// import LabelOutline from 'material-ui/svg-icons/action/label-outline';
// import DataUsage from 'material-ui/svg-icons/device/data-usage';
// import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
//import * as sectionActions from '../actions/sectionActions.jsx';



const style = {

  backgroundPaper:{
    width: 300,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
  },

  title:{
    padding:10,
    fontWeight:'bold'
  },

  image:{
    width: 98,
    height: 137,
    marginLeft:0,
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


const NewCollectionItem = (props) => {

  return (
    <div>
    <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>

      <div style={style.title}>
        {props.title}
      </div>

      <Divider inset={false} />

      <div style={style.imageHolder}>
        <img className='albumImage'  style={style.image} src={props.thumbnail} />
      </div>



      <div style={style.description}>
        <span>Stickers: {props.totalItems}, {props.accountName} {props.year}</span>
      </div>

      <div style={style.cta}>
        <RaisedButton label="Add to my Collections" 
        onTouchTap={props.action.bind(this, props.id)} 
        fullWidth={true} />
      </div>


    </Paper>
    </div>
    );

}

NewCollectionItem.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    year: React.PropTypes.number.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    accountName: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired,
}

export default NewCollectionItem;