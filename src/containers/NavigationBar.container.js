

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import IconButton from 'material-ui/IconButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import * as navigationActions from '../core/navigation/navigationActions';
import AppBar from 'material-ui/AppBar';


const iconButtonStyles = {
    marginTop: 8
};

class NavBar extends Component {

    constructor(props) {
        super(props);
        //this.check = () => // console.log ("clicked");
    }

    goBack() {
        // console.log ("goBack()")
        browserHistory.goBack();
    }

    // <IconButton style={iconButtonStyles} onClick={this.check.bind(this)}><MoreVertIcon color="white"/></IconButton>

    render() {
        return (<AppBar title={this.props.nav.title}
            onLeftIconButtonTouchTap={this.props.actions.toggleDrawer} >
            <IconButton onTouchTap={() => this.goBack()}
                style={iconButtonStyles} >
                <ArrowBack color="#ffffff" />
            </IconButton>
        </AppBar>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        nav: state.nav
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navigationActions, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
