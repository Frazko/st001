import React from 'react';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import * as colors from '../constants/Colors.constants.js';

const style = {
  backgroundPaper: {
    width: '100%',
    textAlign: 'center',
    borderRadius: 6,
  },

  picHolder: {
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    // background:'#FFAAAA',
  },
  pic: {
    height: 60,
    width: 60,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 100
  },
  block: {
    marginLeft: 15,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  blockTitle: {
  }
};

const LikesItem = (props) => {
  return (
      <List>
        <ListItem
          onTouchTap={()=>props.clickHandler(props.id)}
          leftAvatar={<div style={style.picHolder}><Avatar style={style.pic} src={props.profileImage} /></div>}
          style={style.listItem}
          >
          <div style={style.block}>
            <div style={style.blockTitle}>
              <div className="itemTitle">{props.name}</div>
            </div>
          </div>
        </ListItem>
        <Divider inset={true} />
      </List>
  );
}

LikesItem.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  profileImage: React.PropTypes.string,
  items: React.PropTypes.array,
  clickHandler: React.PropTypes.func,
}

export default LikesItem;