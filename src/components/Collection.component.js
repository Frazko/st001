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

  description:{
    margin:20,
    padding:0,
    clear:'both',
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


class Collection extends Component {

    constructor(props) {
        super(props);
    }


    render() {

    
    let percent = parseInt((100 / this.props.totalItems) * this.props.iHave);

    console.log("percent::", percent);


    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>
            

          <div style={style.title}>
            {this.props.title}
          </div>
          <Divider inset={false} />

          <div style={style.imageHolder}>
            <img className='albumImage' style={style.image} src={this.props.thumbnail} />
          </div>

          <List style={style.infoHolder}>
            <ListItem style={style.infoItem} primaryText={this.props.iHave} leftIcon={<Search style={style.infoIcon} />} />
            <ListItem style={style.infoItem} primaryText={this.props.iChange} leftIcon={<LabelOutline style={style.infoIcon} />} />


              <CircularProgress  style={style.circularProgress}
                mode="determinate"
                value={percent}
                size={40}
                thickness={3}
              /> 
            <span style={style.percent} >{percent}% </span>

          </List>


          <div style={style.description}>
            <span>Stickers: {this.props.totalItems}, </span>
            <span>Panini </span>
            <span>{this.props.year}</span>
          </div>

          <div style={style.cta}>
            <RaisedButton label="View Sections" fullWidth={true} />
          </div>


        </Paper>
      </div>
    );
  }
}



/*
  <Divider inset={false} />

  <div style={style.footer}>
    <p >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend scelerisque viverra. Nam elementum mollis volutpat. Aliquam id sapien quis justo pharetra bibendum.
    </p>
  </div>
*/


Collection.propTypes = {
    title: React.PropTypes.string.isRequired,
    iHave: React.PropTypes.number.isRequired,
    iChange: React.PropTypes.number.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
    published: React.PropTypes.string.isRequired,
    account: React.PropTypes.string.isRequired,
    // percent: React.PropTypes.string.isRequired,
}


//TODO:: no necesita connect
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