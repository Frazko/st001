import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { List, ListItem } from 'material-ui/List';

import LikesItem from '../components/LikesItem.component';
import OwnersItem from '../components/OwnersItem.component';

import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

import { addRemoveItem, addFavorite, getFriendsProfilePicture } from "../core/firebase/firebaseData"


const style = {
  backgroundPaper: {
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 6,
    useSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  },
  backgroundPaperHeader: {
    width: '100%',
    // minHeight: 240,
    padding: 10,
    flex: 1,
    backgroundSize: 'cover',
    backgroundImage: 'url(/images/common/bg-image.png)'
  },

  block: {
    // background:'#AAFFFF',
    // marginRight:10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    color: '#FFFFFF',
  },

  stickerHeader: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    // background:'#FFAAAA',

  },


  infoBlock: {
    // background:'#AA0AFF',
    // width: '100%',
    margin: '20px 0 20px 0',
    minWidth: '300px',
    flex: 1,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },

  stickerIndex: {
    fontSize: 100,
    fontWeight: 'bold',
    marginBottom: 40,

  },

  stickerName: {
    fontSize: 30,
    margin: '0 6px 6px 0',
    // height: 28,
    textAlign: 'right'
  },

  stickerLastname: {
    fontWeight: 'bold',
    fontSize: 32,

  },
  stickerSection: {
    fontSize: 14,
    marginRight: 6,
    // background:'#FFAAFF',
    height: 20,
  },

  stickerCollection: {
    fontSize: 14,
    marginRight: 6,
    marginBottom: 10,
    height: 16,
  },


  amountNFavBlock: {
    // background:'#FFAAFF',
    margin: '20px 0 20px 0',
    flex: 1,
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginLeft:20,
  },

  actionBar: {
    //width:200,
    width: '210px',
    // height:56,
    display: 'flex',
    justifyContent: 'space-between',
  },

  lessButton: {
    // height:56,
    textAlign: 'center',
    fontSize: 26,
  },
  plusButton: {
    // height:56,
    textAlign: 'center',
    fontSize: 26,

  },
  amount: {
    // height:56,
    // backgroundColor:'#FFFFFF',
    textAlign: 'center',
    color: '#666666',
    fontSize: 26,

  },
  addFavoriteButton: {
    textAlign: 'center',
    marginTop: 20,

  },

};


const colors = {
  //backgroundColor={colors.plusColor}
  plusColor: "#66CCCC",
  lessColor: "#66AA66",
  amountColor: "#ffffff",
}



class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      slideIndex: 0,
      isFavorite: false,
    };

    this.addToFavorite = this.addToFavorite.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  }

  addToFavorite() {
    addFavorite(this.state.item, !this.state.isFavorite)
      .then((response) => {
        console.log('Adding', response);
        this.props.item.like = response.like;


        this.setState({
          isFavorite: response.like,
        })
      })
  }
  componentWillMount() {
    this.setState({
      isFavorite: this.props.item.like || false,
    })
  }

  addItem() {
    console.log("addItem");
    addRemoveItem(this.state.item, true)
      .then((response) => {
        console.log('Adding', response);
        this.props.item.count = response.count;

        this.setState({
          item: this.props.item,
        });
      })
  }

  removeItem() {
    console.log("removeItem");
    addRemoveItem(this.state.item, false)
      .then((response) => {
        console.log('Adding', response);
        this.props.item.count = response.count;

        this.setState({
          item: this.props.item,
        });
      })

  }
  render() {
    console.log('item', this.state.item)
    const item = this.state.item;
    const [firstName, ...lastName] = item.itemData.title.split(" ");

    const friendsLike = this.props.friendsWithThisCollection.filter(friend => {
      console.log(item.itemData.number, friend.items[item.itemData.number]);
      if (friend.items[item.itemData.number]) {
        return friend.items[item.itemData.number].hasOwnProperty('like');
      }
    });

    const friendsOwner = this.props.friendsWithThisCollection.filter(friend => {
      if (friend.items[item.itemData.number]) {
        return friend.items[item.itemData.number].count > 1
      }
    });

    var noLikes = <div className="noItemsToShow">No likes from your friends. <br />Please share the app with your friends.</div>
    var noOwners = <div className="noItemsToShow">No owners within your friends. <br />Please share the app with your friends.</div>

    console.log("friendsLike:: ", friendsLike, " friendsOwner::", friendsOwner);

    const likesList = (friendsLike.length)?friendsLike.map(friend => {
      return (<LikesItem
        id={friend.friendId}
        key={friend.friendId}
        name={friend.name}
        profileImage={friend.profileImage}
        items={friend.items}
        />)
    }):noLikes;

    const ownersList =(friendsOwner.length)? friendsOwner.map(friend => {
      return (<OwnersItem
        key={friend.friendId}
        id={friend.friendId}
        name={friend.name}
        count={friend.items[item.itemData.number].count}
        profileImage={friend.profileImage}
        items={friend.items}
        />)
    }):noOwners;


    return (
      <div>

        <div>
          <Paper style={style.backgroundPaperHeader} zDepth={1}>
            <div style={style.block}>

              <div style={style.stickerHeader}>

                <div style={style.amountNFavBlock}>

                  <div style={style.actionBar}>

                    <FloatingActionButton
                      style={style.lessButton}
                      onTouchTap={this.removeItem}
                      mini={true}
                      >
                      <Remove />
                    </FloatingActionButton>


                    <FloatingActionButton
                      style={style.amount}
                      disabled={true}
                      mini={true}
                      >
                      {item.count || "0"}
                    </FloatingActionButton>


                    <FloatingActionButton
                      style={style.plusButton}
                      onTouchTap={this.addItem}
                      mini={true}
                      >
                      <Add />
                    </FloatingActionButton>

                  </div>

                  <FloatingActionButton
                    secondary={true}
                    style={style.addFavoriteButton}
                    onTouchTap={this.addToFavorite}
                    mini={true}
                    >
                    {this.state.isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </FloatingActionButton>

                </div>

                <div style={style.infoBlock}>

                  <div style={style.stickerIndex}>
                    #{item.itemData.number}
                  </div>

                  <div style={style.stickerName}>
                    {firstName} <span style={style.stickerLastname}>{lastName}</span>
                  </div>

                  <div style={style.stickerSection}>
                    {this.props.section}
                  </div>

                  <div style={style.stickerCollection}>
                    {this.props.collectionTitle}
                  </div>
                </div>

              </div>

            </div>


          </Paper>
        </div>

        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          >
          <Tab
            icon={<Favorite />}
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
            {likesList}
          </div>
          <div >
            {ownersList}
          </div>
        </SwipeableViews>

      </div>
    );
  }
}


ItemDetail.propTypes = {
  item: React.PropTypes.object.isRequired,
}

export default ItemDetail;