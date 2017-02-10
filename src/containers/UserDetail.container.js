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
import { getUserData } from '../core/firebase/firebaseData';

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
      userData:undefined,
      userCollections:undefined
    };

    console.log('udi::', this.props.params.uid)
  }

  componentWillMount() {
    var userData = getUserData(this.props.params.uid);
    userData.then((data) => {
      console.log('the data:: ', data);
      this.setState({ userData: data.userData, userCollections: data.myCollections });
    })
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  render() {
    const photoURL = (this.state.userData) ? this.state.userData.photoURL : "";
    const displayName = (this.state.userData) ? this.state.userData.displayName : "";
    const description = (this.state.userData) ? this.state.userData.description : "";

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
              <UsersDetailItem
                title="title"
                navigateTo={navigateTo}
              />
            </div>
            <div >
              <UsersDetailCollection
                navigateTo={navigateTo}
              />
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