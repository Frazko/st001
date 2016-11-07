import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import LikesItem from '../components/LikesItem.component';
import OwnersItem from '../components/OwnersItem.component';
//import * as sectionActions from '../actions/sectionActions.jsx';
 


const style = {

  backgroundPaper:{
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
    useSelect: 'none',
    MozUserSelect:'none',
    WebkitUserSelect:'none',
    msUserSelect:'none',
  },
  backgroundPaperHeader:{
    width: '100%',
    height: 240,
    padding:10,
    flex: 1,
    backgroundSize: 'cover',
    backgroundImage: 'url(../images/common/bg-image.png)',
  },

  block : {
    // background:'#AAAAFF',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end', 
    height:'100%',
    color: '#FFFFFF',
  },

  stickerHeader : {
    width:'100%',
    display:'flex',
    justifyContent: 'space-between',
    // alignItems: 'center', 
    // background:'#AAAAFF',

  },
  stickersAmout : {
    position:'relative',
    width: 50,
    height: 50,
    fontSize:26,
    fontWeight:'bold',
    color: '#666666',
    padding:14,
    marginLeft:26,
    top:-15,
    useSelect: 'none',
    // background:'#AAAAFF',

  },


  stickerIndex : {
    position:'relative',
    fontSize:100,
    fontWeight:'bold',
    marginBottom:40,
    // background:'#AAAAFF',

  },

  stickerName : {
    position:'relative',
    fontSize:20,

    marginRight:6,
    height: 20,
  },
  stickerLastname : {
    position:'relative',
    fontWeight:'bold',
    fontSize:22,

  },
  stickerSection : {
    fontSize:12,
    marginRight:6,
    // background:'#FFAAFF',
    height: 16,
  },
  stickerCollection : {
    fontSize:10,
    marginRight:6,
    // background:'#AAAAFF',
    height: 16,
  },

}; 



class StickerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  render() {
    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>

          <div>
            <Paper style={style.backgroundPaperHeader} zDepth={1}>

              <div style={style.block}>
                <div style={style.stickerHeader}>
                  <Paper style={style.stickersAmout} zDepth={2} circle={true} >
                  3
                  </Paper>
                  <div style={style.stickerIndex}>
                    {143}
                  </div>
                </div>
                <div style={style.stickerName}>
                  Machillo <span style={style.stickerLastname}>Ramirez</span>
                </div>
                <div style={style.stickerSection}>
                  Costa Rica
                </div>
                <div style={style.stickerCollection}>
                  Copa America Centenario 
                </div>
              </div>


            </Paper>
          </div>

         <Tabs 
          onChange={this.handleChange}
          value={this.state.slideIndex}
          >
            <Tab
              icon={<Favorite/>}
              label="Likes"
              value={0}
            />
            <Tab
              icon={<SupervisorAccount />}
              label="Owners"
              value={1}
            />
          </Tabs>

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              <LikesItem/>
            </div>
            <div >
              <OwnersItem/>
            </div>
          </SwipeableViews>

        </Paper>
      </div>
    );
  }
}

StickerDetail.propTypes = {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(StickerDetail);