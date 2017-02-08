import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
// import Divider from 'material-ui/Divider';
import { ListItem} from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
// import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// import CircularProgress from 'material-ui/CircularProgress';
// import LinearProgress from 'material-ui/LinearProgress';
// import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
// import ActionHome from 'material-ui/svg-icons/action/home';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
//import * as sectionActions from '../actions/sectionActions.jsx';
 


const style = {

  backgroundPaper:{
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
  },
  indexHolder : {
    top:0,
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height:'100%',
    // background:'#FFAAAA',
  },

  index : {
    // background:'#AAAAFF',
    margin:0,
    height: 50,
    width: 50,
    left:14,
    paddingTop:18,
    textAlign: 'center',
    margin:0,
  },
  amountHolder : {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight:30,
    top:-13,
    // background:'#FFAAAA',
    // border:'solid black 1px',
    height:'100%',
    // width:'40px',
  },
  amount : {
    fontSize:52,
    fontWeight: 'bold',
    color: '#666666',
    // background:'#00AAAA',
    // overflow:'auto',
    //flex:1
  },
  listItem : {
    textAlign:'left',
  },


  block : {
    marginLeft:10,
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', 
  },

  blockTitle:{
    display:'flex',
    alignItems: 'center',
    // background:'#AAFFAA',
    minHeight: 28,
    border: 10,
  },
  socialBlock : {
    display:'flex',
    // background:'#AAAAAA',
    minHeight: 28,
  },
      socialBlockIcon : {
        padding:0,
        marginRight:10,
        height: 28,
        width: 28,
      },
      socialBlockSpan : {
        position:'relative',
        top:-6,
        left:-10,
        margin:0,
      }
};   


const Item = (props) => {
    return (
    
            <ListItem
              className="listItemClass"
              leftAvatar={<div style={style.indexHolder}><Paper style={style.index} zDepth={2} circle={true} > {props.count} </Paper></div>}
              rightIcon={<div style={style.amountHolder}><div style={style.amount}>{props.itemNumber}</div></div>}
              style={style.listItem}

              onTouchTap={props.navigateTo.bind(this, "/"+props.collectionid+"/"+props.sectionId+"/"+props.id)}
              >
              
              <div style={style.block}>
                <div style={style.blockTitle}>
                  <div className="itemTitle">{props.title}</div>
                </div>
                <div style={style.socialBlock}>

                  <div>
                    <IconButton style={style.socialBlockIcon}>
                      {props.iLike? <Favorite /> : <FavoriteBorder /> }
                    </IconButton>
                    <span style={style.socialBlockSpan}> {props.likes} </span>
                  </div>

                  <div>
                    <IconButton style={style.socialBlockIcon}>

                      {props.count? <SupervisorAccount /> : <PeopleOutline /> }

                    </IconButton>
                    <span style={style.socialBlockSpan}> {props.owners}</span>
                  </div>
                </div>
              </div>


            </ListItem>
    );
}

Item.propTypes = {
}
 
 
export default Item;





/*

            <ListItem
              className="listItemClass"
              leftAvatar={<div style={style.indexHolder}><Paper style={style.index} zDepth={2} circle={true} >141</Paper></div>}
              rightIcon={<div style={style.amountHolder}><div style={style.amount}>2</div></div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div style={style.blockTitle}>
                <h1>Suarez-Messi-Neymar-Jordi Alba</h1>
              </div>
              <div style={style.socialBlock}>
                <div>
                  <IconButton style={style.socialBlockIcon}>
                    <Favorite />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 2</span>
                </div>
                <div >
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 18</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />




            <ListItem
              className="listItemClass"
              leftAvatar={<div style={style.indexHolder}><Paper style={style.index} zDepth={2} circle={true} >141</Paper></div>}
              rightIcon={<div style={style.amountHolder}><div style={style.amount}>4</div></div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div style={style.blockTitle}>
                <h1>Huang Bowen / Gao Lin / Ricardo Goulart</h1>
              </div>
              <div style={style.socialBlock}>
                <div>
                  <IconButton style={style.socialBlockIcon}>
                    <FavoriteBorder />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 5</span>
                </div>
                <div >
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 4</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />




            <ListItem
              className="listItemClass"
              leftAvatar={<div style={style.indexHolder}><Paper style={style.index} zDepth={2} circle={true} >141</Paper></div>}
              rightIcon={<div style={style.amountHolder}><div style={style.amount}>3</div></div>}
              style={style.listItem}>
              
              <div style={style.block}>
              <div style={style.blockTitle}>
                <h1>Osmar Mares / José Guerrero / Rubens Sambuesa / Francisco Murillo / Cantinflas / Machillo Ramirez</h1>
              </div>
              <div style={style.socialBlock}>
                <div>
                  <IconButton style={style.socialBlockIcon}>
                    <Favorite />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 3</span>
                </div>
                <div >
                  <IconButton style={style.socialBlockIcon}>
                    <SupervisorAccount />
                  </IconButton>
                  <span style={style.socialBlockSpan}> 7</span>
                </div>
              </div>
              </div>
            </ListItem>
            <Divider inset={true} />
          

*/