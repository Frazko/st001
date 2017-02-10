import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
// import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// import CircularProgress from 'material-ui/CircularProgress';
// import LinearProgress from 'material-ui/LinearProgress';
// import RaisedButton from 'material-ui/RaisedButton';
// import IconButton from 'material-ui/IconButton';
// import ActionHome from 'material-ui/svg-icons/action/home';
// import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
// import Favorite from 'material-ui/svg-icons/action/favorite';
// import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Label from 'material-ui/svg-icons/action/label';
//import * as sectionActions from '../actions/sectionActions.jsx';

import * as colors from '../constants/Colors.constants.js';

const style = {
    backgroundPaper: {
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        borderRadius: 6,
        // minHeight:200,
    },
    indexHolder: {
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        // background:'#FFAAAA',
    },
    index: {
        height: 60,
        width: 60,
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    block: {
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    blockTitle: {
        display: 'flex',
        alignItems: 'center',
        // background:'#AAFFAA',
        minHeight: 28,
        border: 10,
    },
    socialBlock: {
        display: 'flex',
        // background:'#AAAAAA',
        minHeight: 28,
    },
    socialBlockIcon: {
        padding: 0,
        height: 28,
        width: 28,
    },
    socialBlockSpan: {
        position: 'relative',
        top: -8,
        margin: 0,
        fontSize: 18,
        fontWeight: 'bold',
        //color:'#FFFFFF'
    },
    heartColor: '#AA2222',
};


const OwnersItem = (props) => {
    return (<List>
        <ListItem
            onTouchTap={() => props.clickHandler(props.id)}
            leftAvatar={<div style={style.indexHolder}>
                <Avatar style={style.index} src={props.profileImage} /></div>}
            style={style.listItem}>
            <div style={style.block}>
                <div style={style.blockTitle}>
                    <div className="itemTitle"> {props.name}
                    </div>
                </div>
                <div style={style.socialBlock}>
                    <div >
                        <Label style={style.socialBlockIcon} color={colors.ICON_SALE_LABEL_COLOR} />
                        <span style={style.socialBlockSpan}>
                            {props.count}
                        </span>
                    </div>
                </div>
            </div>
        </ListItem>
        <Divider inset={true} />
    </List>
    );
}


OwnersItem.propTypes = {
    id: React.PropTypes.string,
    count: React.PropTypes.number,
    name: React.PropTypes.string,
    profileImage: React.PropTypes.string,
    items: React.PropTypes.array
}

export default OwnersItem;




// <ListItem
//   leftAvatar={<div style={style.indexHolder}><Avatar style={style.index} src="/images/common/avatar2.jpg" /></div>}
//   style={style.listItem}>

//   <div style={style.block}>
//   <div style={style.blockTitle}>
//     <div className="itemTitle">Neymar Jordi Alba</div>
//   </div>
//   <div style={style.socialBlock}>
//       <div >
//           <Label style={style.socialBlockIcon} color={colors.ICON_SALE_LABEL_COLOR}  />
//           <span style={style.socialBlockSpan}> 1</span>
//       </div>
//   </div>
//   </div>
// </ListItem>
// <Divider inset={true} />

// <ListItem
//   leftAvatar={<div style={style.indexHolder}><Avatar style={style.index} src="/images/common/avatar4.png" /></div>}
//   style={style.listItem} 
//   >
//   <div style={style.block}>
//   <div style={style.blockTitle}>
//     <div className="itemTitle">Suarez Messi</div>
//   </div>
//   <div style={style.socialBlock}>
//       <div >
//           <Label style={style.socialBlockIcon} color={colors.ICON_SALE_LABEL_COLOR}  />
//           <span style={style.socialBlockSpan}> 5</span>
//       </div>
//   </div>
//   </div>
// </ListItem>
// <Divider inset={true} />




// <ListItem
//   leftAvatar={<div style={style.indexHolder}><Avatar style={style.index} src="/images/common/avatar3.png" /></div>}
//   style={style.listItem}>
//   <div style={style.block}>
//   <div style={style.blockTitle}>
//     <div className="itemTitle">Huang Bowen </div>
//   </div>
//   <div style={style.socialBlock}>
//       <div >
//           <Label style={style.socialBlockIcon} color={colors.ICON_SALE_LABEL_COLOR}  />
//           <span style={style.socialBlockSpan}> 2</span>
//       </div>
//   </div>
//   </div>
// </ListItem>
// <Divider inset={true} />