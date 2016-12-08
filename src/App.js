import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, getAuth } from 'src/core/auth';
import { paths } from './router/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './containers/NavigationBar.container';
import NavigationDrawer from './containers/NavigationDrawer.container';
import LogOff from './components/LogOff.component';
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
		return (
			<MuiThemeProvider>
				<div>
				  {(this.props.auth.authenticated)?
				  	<div>
					  	<NavBar />
					  	<NavigationDrawer 
						  authenticated={this.props.auth.authenticated}
			          	  signOut={this.props.signOut} />
			        </div>
			      :null}

					<div className="main">{this.props.children}</div>

					{/*
					<LogOff
			          authenticated={this.props.auth.authenticated}
			          signOut={this.props.signOut}
		        	/>*/}


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
