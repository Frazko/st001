import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from './router/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import LogOff from './components/LogOff.component';
import NavBar from './containers/NavigationBar.container';
import NavigationDrawer from './containers/NavigationDrawer.container';
import CollectionNew from './components/CollectionNew.component';
import Collection from './components/Collection.component';
import SectionItem from './components/SectionItem.component';
import StickerItem from './components/StickerItem.component';

import StickerDetail from './containers/StickerDetail.container';
import UserDetail from    './containers/UserDetail.container';


class App extends Component {

	componentWillReceiveProps(nextProps) {
		const { router } = this.context;
		const { auth } = this.props;

		if (auth.authenticated && !nextProps.auth.authenticated) {
			router.replace(paths.SIGN_IN);
		}
		else if (!auth.authenticated && nextProps.auth.authenticated) {
			router.replace(paths.TASKS);
		}
	}

	render() {
		console.log("this.props.children",this.props.children)
		return (
			<MuiThemeProvider>
				<div>
					<NavBar />
					<NavigationDrawer authenticated={this.props.auth.authenticated}
			          signOut={this.props.signOut} />

					<LogOff
			          authenticated={this.props.auth.authenticated}
			          signOut={this.props.signOut}
		        	/>

					<div className="main">{this.props.children}</div>

					User Detail
					<UserDetail/>
					Sticker Detail
					<StickerDetail/>
					Stickers
					<StickerItem/>
					Sections
					<SectionItem/>
					Collections
					<Collection/>
					New Collections
					<CollectionNew/>
				</div>
			</MuiThemeProvider>
			);
	}
}


//=====================================
//  CONNECT
//-------------------------------------

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

App.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
};



const mapStateToProps = createSelector(
    getAuth,
    auth => ({ auth })
);

export default connect(
    mapStateToProps,
    authActions
)(App);


/*
import React from 'react';

//import FacebookButton from './components/FacebookButton.jsx';
import CoursesPage from './components/CoursesPage.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
);


class App extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'App';
		/*this.state = {
			messages: [
			'Por fin sirve esta vara'
			]
		};* /
	}


	render() {
		/*
		var messagesNodes = this.state.messages.map((message) => {
			return ( <div> { message } </div>);
		});
		return <div><FacebookButton fb={FB} /> { messagesNodes } </div>;
		<CoursesPage />
		* /

		return <MuiThemeProvider><div>    <MyAwesomeReactComponent /></div></MuiThemeProvider>;
	}
}
*/

