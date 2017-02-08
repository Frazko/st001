import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import Paper from 'material-ui/Paper';
import { ListItem} from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import CircularProgress from 'material-ui/CircularProgress';
// import LinearProgress from 'material-ui/LinearProgress';
// import RaisedButton from 'material-ui/RaisedButton';
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
  return '#' + (Math.random()/2).toString(16).slice(2, 8).toUpperCase();
}

const Section = (props) => {

    let percent = parseInt((100 / props.totalItemsBySection) * props.myItemsBySection) || 0;
    //'/:collection/:section/:detail'
    return (

            <ListItem
              leftAvatar={<div style={style.circularProgressSettings.circularProgressHolder}><CircularProgress
              mode="determinate"
              value={percent}
              size={style.circularProgressSettings.size}
              thickness={style.circularProgressSettings.thickness}
              style={style.circularProgressSettings.circularProgress}
              color={circularProgressColor()}
              /></div>}
              
              rightIcon={<div style={style.chevronHolder}><ChevronRight /></div>}
              primaryText={props.title}
              secondaryText={props.collection +", " + props.account}
              style={style.listItem}

              onTouchTap={props.navigateTo.bind(this, "/"+props.collectionId+"/"+props.id)}
            />
    );
}

Section.propTypes = {
    id: React.PropTypes.number.isRequired,
    collection: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    account: React.PropTypes.string.isRequired,
    collectionId: React.PropTypes.string.isRequired
} 
 
export default Section;