import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import * as utils from '../utils';
import CollectionItem from '../components/CollectionItem.component';
import Item from '../components/Item.component';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import * as navigationActions from '../core/navigation/navigationActions';


const style = {
    margin: 12,
};

class Dashboard extends Component {

    componentWillMount(){
       this.props.navActions.navBarTitleUpdate("Dashboard");
    }


    render() {

       return ( <div>

        <RaisedButton label = "Display My Collections"
        style = { style }
        onClick = {
            () => {
                utils.navigateTo("/myCollections");
            }
        }
        />

        <RaisedButton label = "Display New Collections"
        style = { style }
        onClick = {
            () => {
                utils.navigateTo("/newCollections");
            }
        }
        />




        </div>);
   }
}

function mapStateToProps(state, ownProps) {
    return {
    }
}


function mapDispatchToProps(dispatch) {
    return {
        navActions: bindActionCreators(navigationActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

