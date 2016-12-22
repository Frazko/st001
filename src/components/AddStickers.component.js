import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { getCollections } from "../core/firebase/firebaseData"

class AddStickers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            collections: []
        };
    }

    componentWillMount() {
        //TODO:: CHECK IF DATA ALREADY LOADED IN STORE
        getCollections(this.props.userData.providerData[0].uid)
            .then(values => {
                console.log("collections::: ", values);
                this.setState({ collections: values });
                // this.props.actions.saveUserData(values);
            }).catch(function(e) {
                console.error("<<<<<  ERROR getCollections in AddStickers >>>>>", e);
            });
    }

    handleAddStickers() {
        console.log("handleOpen()");
    };

    handleChange = (event, index, value) => {
        this.setState({value});
        console.log(event, index, value);
    };

    render() {

        const actions = [
            <FlatButton
            label = "Cancel"
            primary = { true }
            onTouchTap = { this.props.handleClose }
            />,  
            <FlatButton
            label = "Ok"
            primary = { true }
            onTouchTap = { this.handleAddStickers.bind(this) }
            />
        ];

        let collections = this.state.collections.map(item => item[Object.keys(item)[0]]);

        let list = (collections.length) ? collections.map((item, i) => ( <MenuItem key = { i } id = { item.data.id } value = { i } primaryText = { item.data.title }/>)):undefined;

        let noItems = <MenuItem value = { 1 } primaryText = "Please add a collection first. " / > ;

        console.log("list::: ", this.state);


        return ( <Dialog title = "Add Stickers"
            actions = { actions }
            modal = { true }
            open = { this.props.visible } >
            <div>



            <SelectField floatingLabelText = "Select Collection" 
            value = {this.state.value}
            onChange = {this.handleChange}
            fullWidth = { true }> 

            { list || noItems } 
            
            </SelectField>





            <br />

            <TextField hintText = "eg:10 2 14 122"
            floatingLabelText = "Add Sticker Numbers"
            fullWidth = { true }
            />
            <br />

            </div>

            </Dialog>
        );
    }
}



AddStickers.propTypes = {}

function mapStateToProps(state, ownProps) {
    // console.log("SAVE_USER_COLLECTIONS_DATA_SUCCESS state",state)
    return {
        userData: state.auth.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(sectionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStickers);
