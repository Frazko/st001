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
    minHeight: 100,
    // background:'#FFFFAA',
    // border: 'solid 1px #0000AA ',
  },
  block: {
    marginLeft: 15,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // background:'#AAFFFF',
  },

  blockTitle: {
  }
};

const UsersDetailItem = (props) => {
  return (
    <List>
      <ListItem
        leftAvatar={<div style={style.picHolder}><b> {props.number}</b></div>}
        style={style.listItem}
      >
        <div style={style.block}>
          <div style={style.blockTitle}>
            <div className="itemTitle"> {props.title}</div>
            <div className="itemTitle"> {props.year}</div>
            <div className="itemTitle"> {props.sectionName}</div>
            <div className="itemTitle"> {props.collectionName}</div>
            <div className="itemTitle"> {'Account:' + props.accountName}</div>
          </div>
        </div>
      </ListItem>
      <Divider inset={true} />
    </List>
  );
}

UsersDetailItem.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  profileImage: React.PropTypes.string,
  items: React.PropTypes.array
}

export default UsersDetailItem;