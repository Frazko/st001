import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
 


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
    fontWeight:'bold',
    lineHeight:1.2,
  },

  image:{
    width: 98,
    height: 137,
    marginLeft:60,
    marginTop:15,
    borderRadius: 6,
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
    padding:0,
  },

  cta:{
    margin:20,
    padding:0,
  },

  percent:{
    top:-14,
    left:-20,
    position:'relative',
  },

  circularProgress:{
    left:14,
    position:'relative',
  }
};   

const Collection = (props) => {
    
    let percent = parseInt((100 / props.totalItems) * props.iHave);
    let iSearch = props.totalItems - props.iHave ;

    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
          <div style={style.title}>
            {props.title}
          </div>
          <Divider inset={false} />

          <div style={style.imageHolder}>
            <img className='albumImage' style={style.image} src={props.thumbnail} />
          </div>

          <List style={style.infoHolder}>
            <ListItem style={style.infoItem} primaryText={iSearch} leftIcon={<Search style={style.infoIcon} />} />
            <ListItem style={style.infoItem} primaryText={props.iChange} leftIcon={<LabelOutline style={style.infoIcon} />} />
              <CircularProgress  style={style.circularProgress}
                mode="determinate"
                value={percent}
                size={40}
                thickness={3}
              /> 
            <span style={style.percent} >{percent}% </span>
          </List>

          <div style={style.description}>
            <span>Stickers: {props.totalItems}, </span>
            <span>{props.accountName} </span>
            <span>{props.year}</span>
          </div>

          <div style={style.cta}>
            <RaisedButton label="View Sections" fullWidth={true} onTouchTap={props.navigateTo.bind(this, "/"+props.id)} />
          </div>

        </Paper>
      </div>
    );
}

Collection.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    iHave: React.PropTypes.number.isRequired,
    iChange: React.PropTypes.number.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    published: React.PropTypes.string.isRequired,
    account: React.PropTypes.string.isRequired,
    accountName: React.PropTypes.string.isRequired,
    navigateTo: React.PropTypes.func.isRequired,
}

export default Collection 