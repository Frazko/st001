import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import Collection from '../components/Collection.component';
import * as userDataActions from '../core/collectionsData/dataActions';
import * as navigationActions from '../core/navigation/navigationActions';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {getCollections, getCollectionsNames, getAccountNames} from "../core/firebase/firebaseData"
import { windowResize, navigateTo } from '../utils';


const styles = {
	root: {
		textAlign: 'center',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
        //background:'#FFAAAA',
    },
    gridList: {
    	width: '100%',
    	overflowY: 'auto',
    	height: windowResize() - 50,
    },
};

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        windowResize();
        this.updateDimensions();
    }

    componentWillMount() {
        this.props.navActions.navBarTitleUpdate("My Collections");
        //TODO:: CHECK IF DATA ALREADY LOADED IN STORE
        getCollections(this.props.userData.providerData[0].uid)
            .then(values => {
                console.log("collections::: ", values);
                this.setState({ collections: values });
                this.props.actions.saveUserData(values);
            }).catch(function(e) {
                console.error("<<<<<  ERROR getCollections >>>>>", e);
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
            }).catch(function(e) {
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

                // console.log("accountNames::: ", accountNames);
                this.setState({ accountNames: accountNames });
                this.props.actions.saveAccountNames(accountNames);
            }).catch(function(e) {
                console.error("<<<<< collections ERROR getAccountNames >>>>>", e);
            });

        window.addEventListener('resize', () => this.updateDimensions(), true);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        let newHeight = windowResize() - 50;
        this.setState({ gridList: Object.assign({}, styles.gridList, { height: newHeight }) });
    }

	    render(){


	    	let collections=[];
	    	// TODO:: send Stickers Numbers by getting items lenght 

	    	if (this.state.collections && this.state.accountNames){
	    		collections= this.state.collections.map(item => {
	    			let album = item[Object.keys(item)[0]];
	    			album.data.id = Object.keys(item)[0];
	    			album.data.accountName = this.state.accountNames.filter((account) => account[album.data.account])[0][album.data.account];
	    			
                    return album;
	    		});

                // this.props.actions.saveUserData(collections);
	    	}

	    	let list = (collections.length)? collections.map((item, i) => (

	    			<Collection 
	    			key={i} 
	    			id={item.data.id} 
	    			title={item.data.title}
	    			totalItems={item.data.totalItems}
	    			year={item.data.year}
	    			thumbnail={item.data.thumbnail['400x400']}
	    			published={item.data.published}
	    			account={item.data.account}
	    			iHave={item.iHave}
	    			iChange={item.iChange}
	    			accountName={item.data.accountName}
	    			navigateTo = {navigateTo}
	    			/>
	    			)):undefined;

			let noItems = <div className="noItemsToShow">No items to show. <br/>Please add a collection</div>

	    	return (<div 
	    		style={styles.root}>
	    		<GridList
	    		cols={1}
	    		cellHeight={320}
	    		padding={1}
	    		style={this.state.gridList}
	    		>
	    		{list || noItems}
	    		</GridList>
	    		</div>

	    		);
	    }
	}
function mapStateToProps(state, ownProps) {
    // console.log(">>>>>>>>> state collection", state.auth.data);
    return {
        userData: state.auth.data
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userDataActions, dispatch),
        navActions: bindActionCreators(navigationActions, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Collections);
