import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import QuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import { windowResize, navigateTo } from '../utils';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Avatar from 'material-ui/Avatar';
import UsersDetailItem from '../components/UsersDetailItem.component';
import UsersDetailCollection from '../components/UsersDetailCollection.component';
import { getUserData, getCollections, getAccountNameByID } from '../core/firebase/firebaseData';

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
    height: 240,
    padding: 10,
    flex: 1,
    backgroundSize: 'cover',
    backgroundImage: 'url(../images/common/bg-image.png)',
  },

  block: {
    // background:'#AAAAFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    color: '#FFFFFF',
  },

  stickerHeader: {
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    // alignItems: 'center', 
    // background:'#AAAAFF',

  },
  avatarHolder: {
    // background:'#AAAAFF',

  },
  avatar: {
    width: 100,
    height: 100,
    border: '4px solid white',
    borderRadius: 100,
    // background:'#AAAAFF',

  },

  userName: {
    fontSize: 20,
    marginRight: 6,
    height: 20,
  },
  userLastname: {
    fontWeight: 'bold',
    fontSize: 22,

  },
  description: {
    fontSize: 14,

  },
  chatIcon: {
    color: '#FFFFFF',
    width: 30,
    height: 30,
  },

};



class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      userData: undefined,
      userCollections: undefined
    };

    //console.log('udi::', this.props.params.uid)
  }

  componentWillMount() {
    var userData = getUserData(this.props.params.uid);
    userData.then((data) => {
      //console.log('the data:: ', data);
      this.setState({ userData: data.userData });
    });

    getCollections(this.props.params.uid, false)
      .then((collections) => {
        // //console.log('the data::collections ', collections);

        collections.map(collection => {

          for (var key in collection) {
            console.log('the data::collection ', collection[key]);
            getAccountNameByID(collection[key].data.account)
              .then(accountName => {
                console.log('    ------ getAccountNameByID accountName ', accountName);
                collection[key].data.accountName = accountName;
                console.log('    ------ getAccountNameByID accountName ', collection[key].data.accountName);
                // console.log('    ------ getAccountNameByID accountName ', obj);
                let userCollectionsItems = this.flatternItems(collections);
                console.log('1:::::::::::::::::::::::::::   the data::userCollectionsItems ', userCollectionsItems);
                this.setState({ userCollections: collections, userCollectionsItems: userCollectionsItems });
              });

          }
        })

      });
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  flatternItems(collections) {
    //console.log('the data flatternItems', collections);
    var items = [];
    collections.map((collection) => {
      //console.log('the collection >>', collection);
      for (var key in collection) {
        //console.log('the collection[key] >>', key);
        if (collection.hasOwnProperty(key)) {
          let currentCollectionItems = collection[key].items.filter(item => item.count > 1);
          currentCollectionItems.map((item) => {
            //console.log('currentCollectionItems  item >> ', item, collection[key].data.title);
            item.itemData.collectionName = collection[key].data.title;
            item.itemData.sectionName = collection[key].sections[item.itemData.section];
            item.itemData.year = collection[key].data.year;
            item.itemData.accountName = collection[key].data.accountName;
            //console.log('::::::: collection[key].data', collection[key].data.accountName);
          })

          // //console.log('...items >> ', ...items, '...currentCollectionItems', ...currentCollectionItems);
          items = [...items, ...currentCollectionItems];
        }
      }

    })
    //console.log('the data flatternItems >>', items);
    return items;
  }

  render() {
    const photoURL = (this.state.userData) ? this.state.userData.photoURL : "";
    const displayName = (this.state.userData) ? this.state.userData.displayName : "";
    const description = (this.state.userData) ? this.state.userData.description : "";

    let noItems = <div className="noItemsToShow">No items to show.</div>
    var UserDetailItems = noItems;
    var UsersDetailCollections = noItems;







    console.log('2:::::::::::::::::::::  >>>', this.state.userCollectionsItems)





    if (this.state.userCollections) {
      //console.log('debug Building userCollections');
      const userCollections = this.state.userCollections.map(collection => {
        return { collection: collection, items: collection[Object.keys(collection)[0]].items.filter(item => { return item.count >= 2 }) };
      });

      UserDetailItems = this.state.userCollectionsItems.map((item, i) => {
        return <UsersDetailItem
          key={i}
          id={item.itemData.id}
          title={item.itemData.title}
          number={item.itemData.number}
          section={item.itemData.section}
          sectionName={item.itemData.sectionName}
          collection={item.itemData.collection}
          collectionName={item.itemData.collectionName}
          account={item.itemData.account}
          accountName={item.itemData.accountName}
          year={item.itemData.year}
          navigateTo={navigateTo}
        />
      });

      //console.log('debug 3', this.state.userCollectionsList);

      if (this.state.userCollections)
        UsersDetailCollections = this.state.userCollections.map((collection, i) => {
          let id = Object.keys(collection)[0];
          collection = collection[Object.keys(collection)];
          return <UsersDetailCollection
            key={i}
            id={id}
            title={collection.data.title}
            navigateTo={navigateTo}
          />
        }
        )

      //console.log('debug UserDetailItems', UserDetailItems);
    }













    return (
      <div>
        <Paper style={style.backgroundPaper} zDepth={2} rounded={true}>

          <div>
            <Paper style={style.backgroundPaperHeader} zDepth={1}>

              <div style={style.block}>
                <div style={style.stickerHeader}>
                  <div style={style.avatarHolder}>
                    <Avatar style={style.avatar} src={photoURL} />
                  </div>
                </div>
                <div style={style.userName}>
                  {displayName.substr(0, displayName.indexOf(' '))} <span style={style.userLastname}>{displayName.substr(displayName.indexOf(' '), displayName.length)}</span>
                </div>
                <div style={style.description}>
                  {description}
                </div>
                <div >
                  <IconButton
                    iconStyle={style.chatIcon}
                  >
                    <QuestionAnswer />
                  </IconButton>
                </div>
              </div>


            </Paper>
          </div>

          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab
              // icon={<Favorite/>}
              label="Stickers"
              value={0}
            />
            <Tab
              // icon={<SupervisorAccount />}
              label="Collections"
              value={1}
            />
          </Tabs>

          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              {UserDetailItems}
            </div>
            <div >
              {UsersDetailCollections}
            </div>
          </SwipeableViews>

        </Paper>
      </div>
    );
  }
}

UserDetail.propTypes = {
}

function mapStateToProps(state, ownProps) {
  return {
    //courses: state.courses
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(sectionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);