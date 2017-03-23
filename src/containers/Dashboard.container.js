import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import { Link } from 'react-router';

import * as utils from '../utils';
// import CollectionItem from '../components/CollectionItem.component';
import UserDetail from '../containers/UserDetail.container';
import DashboardComponent from '../components/Dashboard.component';
// import Item from '../components/Item.component';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userDataActions from '../core/collectionsData/dataActions';
import * as navigationActions from '../core/navigation/navigationActions';
import { getCollections, getCollectionsNames, getAccountNames, getFriendsItems } from "../core/firebase/firebaseData"


const style = {
    margin: 12,
};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collections: [],
            albumNames: [],
            accountNames: [],
        };
    }



    componentWillMount() {



        this.props.navActions.navBarTitleUpdate("Dashboard");
        //
        if (this.props.collections.length < 1) {
            // console.log ("******************* dashboard NO HAY DATOS DE COLLECTIONS.. CREANDO NUEVOS **********************")
            getCollections(this.props.userData.providerData[0].uid)
                .then(values => {
                    // console.log ("collections::: ", values);
                    if (!values[0]) return undefined
                    let collections = values.map(item => item[Object.keys(item)[0]]);
                    this.props.actions.saveUserData(values);
                    this.setState({ collections: collections });
                }).catch(function (e) {
                    console.error("<<<<<  ERROR getCollections in AddStickers >>>>>", e);
                });

            getCollectionsNames()
                .then(names => {
                    let albumNames = names.map((a) => {
                        let Aa = Object.keys(a)[0],
                            obj = {};
                        obj[Aa] = a[Aa].data.title;
                        return obj;
                    })
                    this.setState({ albumNames: albumNames });
                    this.props.actions.saveAlbumNames(albumNames);
                }).catch(function (e) {
                    console.error("<<<<<  ERROR getCollectionsNames >>>>>", e);
                });

            getAccountNames()
                .then(names => {
                    let accountNames = names.map((a) => {
                        let Aa = Object.keys(a)[0],
                            obj = {};
                        obj[Aa] = a[Aa].account;
                        return obj;
                    })

                    this.setState({ accountNames: accountNames });
                    this.props.actions.saveAccountNames(accountNames);
                }).catch(function (e) {
                    console.error("<<<<< collections ERROR getAccountNames >>>>>", e);
                });
        } else {
            // console.log ("******************* dashboard HAY DATOS DE COLLECTIONS EN STORE **********************")
            // console.log (this.props.collections)
            this.setState({ collections: this.props.collections });
        }

    }


    render() {
        const MyCollections = (props) => <RaisedButton label="Display My Collections"
            style={style}
            onClick={
                () => {
                    utils.navigateTo("/myCollections");
                }
            }
        />;

        const NewCollections = (props) => <RaisedButton label="Display New Collections"
            style={style}
            onClick={
                () => {
                    utils.navigateTo("/newCollections");
                }
            }
        />;

        let Renderhtml = (props) => <div className="noItemsToShow">Loading data...</div>;

        if (this.state.collections.length > 0) {
            // console.log ('BUILD DASHBOARD');
            Renderhtml = (props) => <div > <MyCollections /> <NewCollections /></div>;
        } 


        // return (<Renderhtml />);
        return (<DashboardComponent />);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        userData: state.auth.data,
        collections: state.userCollections.collections
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userDataActions, dispatch),
        navActions: bindActionCreators(navigationActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
