import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import NewCollectionItem from '../components/NewCollectionItem.component';
import * as userDataActions from '../core/collectionsData/dataActions';
import * as navigationActions from '../core/navigation/navigationActions';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as dataActions from "../core/firebase/firebaseData"
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
class NewCollections extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    componentDidMount() {
        windowResize();
        this.updateDimensions();
    }

    componentWillMount() {
        this.props.navActions.navBarTitleUpdate("New Collections");

        console.log("componentWillMount()");
        console.log(">", this.props.collections.length > 0)
        if (this.props.collections.length == 0) {
            dataActions.getNewCollections(this.props.userData.providerData[0].uid)
                .then(values => {
                    this.setState({ collections: values });
                    this.props.actions.saveNewCollections(values);
                    console.log("==>> collections::: ", values);
                }).catch(function(e) {
                    console.error("<<<<<  ERROR getNewCollections >>>>>", e);
                });
        } else {
            console.log("******************* HAY DATOS DE COLLECTIONS EN STORE **********************")
            console.log("*", this.props.collections)
            this.setState({ collections: this.props.collections });
        }

        dataActions.getCollectionsNames()
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

        dataActions.getAccountNames()
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
                console.error("<<<<<  ERROR getAccountNames >>>>>", e);
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

    addToMyCollections(id) {
        console.log("addToMyCollections>> ", dataActions.addToMyCollections(this.props.userData.providerData[0].uid, id));
        dataActions.addToMyCollections(this.props.userData.providerData[0].uid, id)
            .then(result => {
                console.log("result>> ", result);
                this.handleOpen();
            })
    }

    handleOpen() {
        console.log("handleOpen()")
        this.setState({ open: true });

        console.log("state ", this.state)
    };

    handleClose() {
        this.setState({ open: false });
        this.componentWillMount();
    };

    render(){

        const actions = [
        <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
        />
        ];

	// console.log("***********   Render ************");
	let collections=[];
	// TODO:: send Stickers Numbers by getting items lenght 

	if (this.state.collections && this.state.accountNames){
		collections= this.state.collections.map(item => {
			let album = item[Object.keys(item)[0]];
			album.data.id = Object.keys(item)[0];
			album.data.accountName = this.state.accountNames.filter((account) => account[album.data.account])[0][album.data.account];
			return album;
		});
	}

	let list = (collections.length)?collections.map((item, i) => (

       <NewCollectionItem 
       key={i} 
       id={item.data.id} 
       title={item.data.title}
       totalItems={item.data.totalItems}
       accountName={item.data.accountName}
       year={item.data.year}
       thumbnail={item.data.thumbnail['400x400']}
       action={this.addToMyCollections.bind(this)}

       />
       )):undefined;

	let noItems = <div className="noItemsToShow">No items to show.</div>

	return (<div 
		style={styles.root}>


		<GridList
		cols={1}
		cellHeight={340}
		padding={1}
		style={this.state.gridList}
		>
		{list || noItems}
		</GridList>

		<Dialog
		title="Collection Added"
		actions={actions}
		modal={true}
		open={this.state.open}
		>
		This Collection has been added to your collections list.
		</Dialog>

		</div>

		);
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


export default connect(mapStateToProps, mapDispatchToProps)(NewCollections);
