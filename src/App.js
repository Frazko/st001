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
			router.replace(paths.DASHBOARD);
		}
	}

	render() {
		console.log("this.props.children",this.props.children)
		return (
			<MuiThemeProvider>
				<div>
					<NavBar />
					<NavigationDrawer 

					  authenticated={this.props.auth.authenticated}
			          signOut={this.props.signOut} />

					<div className="main">{this.props.children}</div>

					<LogOff
			          authenticated={this.props.auth.authenticated}
			          signOut={this.props.signOut}
		        	/>


				</div>
			</MuiThemeProvider>
			);
	}
}

/*

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
 */


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
