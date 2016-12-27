import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userDataActions from '../core/collectionsData/dataActions';

import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { getCollections, addStickers } from "../core/firebase/firebaseData"

import { validateNumericOnly, validateInRange, outOfRange, uniqueInList } from '../utils';

class AddStickers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            collections: [],
            textFieldValue: "",
            itemsSent:false
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("******************* addStickers HAY DATOS DE COLLECTIONS EN STORE componentWillReceiveProps*", nextProps.collections)
        let collections = nextProps.collections.map(item => item[Object.keys(item)[0]]);
        this.setState({ collections: collections });
    }


    componentWillMount() {
        console.log("componentWillMount()");

    }


    handleAddStickers() {
        console.log("handleAddStickers()");
        console.log("test ", validateNumericOnly(this.state.textFieldValue));


        if (validateNumericOnly(this.state.textFieldValue)) {
            let collectionLength = this.state.collections[this.state.value].items.length;
            let validItems = validateInRange(this.state.textFieldValue, collectionLength);
            let invalidItems = outOfRange(this.state.textFieldValue, collectionLength);

            //1 2 3 4 5 6 7 8 9  1 2 3 1 4 2 3 5 4 46 43 21 22 3 1 4 6 7 
            

            addStickers(this.props.userData.providerData[0].uid, this.state.collections[this.state.value].data.id, validItems)
                .then((response)=>{
                  console.log("response>> ", response);

                  console.log("validItems>> ", uniqueInList(validItems).sort());
                  console.log("invalidItems>> ", uniqueInList(invalidItems).sort());
                  console.log("repeated stickers>> ", uniqueInList(response.repeated).sort());
                  console.log("Not repeated stickers>> ", uniqueInList(response.notRepeated).sort());
                  
                  this.setState({ 
                    validItems:uniqueInList(validItems).sort(), 
                    invalidItems:uniqueInList(invalidItems).sort(),
                    notRepeated:uniqueInList(response.repeated).sort(),
                    repeated:uniqueInList(response.notRepeated).sort()
                  });

                  this.setState({ 
                    textFieldValue:"",
                    itemsSent:true
                  })
                })

        } else {
            this.errorAlert("Not Numeric");
        }

        if (this.state.itemsSent){
          this.state.itemsSent=false;
          this.state.textFieldValue="";
          this.props.handleClose();
        }
    };
    errorAlert() {
        //TODO:: show error in textfield
        console.log("Error");
    }

    handleChange = (event, index, value) => {
        this.setState({ value });
        console.log("Selected ", this.state.collections[this.state.value]);
        console.log("new items ", this.state.textFieldValue.split(" "));
        console.log("Selected ", this.state.collections[value].items.length);
    };

    handleTextFieldChange(event, value) {
        //console.log(event,value);
        this.setState({
            textFieldValue: value
        });
    }

    render() {
            console.log("*** RENDER *** ");
            const actions = [ <FlatButton
                label = "Cancel"
                primary = { true }
                onTouchTap = { this.props.handleClose }
                />,   <FlatButton
                label = "Ok"
                primary = { true }
                onTouchTap = { this.handleAddStickers.bind(this) }
                />
            ];


            let list = (this.state.collections.length) ? this.state.collections.map((item, i) => ( <MenuItem key = { i }
                    id = { item.data.id }
                    value = { i }
                    primaryText = { item.data.title }
                    />)):undefined;

                    let noItems = < MenuItem value = { 1 }
                    primaryText = "Please add a collection first. " /> ;

                    // console.log("add stickers album list::: ", this.state.collections);


                    return ( <Dialog title = "Add Stickers"
                        actions = { actions }
                        modal = { true }
                        open = { this.props.visible } >


                        { !this.state.itemsSent ?  
                        <div >
                        <SelectField floatingLabelText = "Select Collection"
                        value = { this.state.value }
                        onChange = { this.handleChange }
                        fullWidth = { true } >

                        { list || noItems }

                        </SelectField>


                        <br / >

                        <TextField hintText = "eg:10 2 14 122"
                        floatingLabelText = "Add Sticker Numbers"
                        fullWidth = { true }
                        value = { this.state.textFieldValue }
                        multiLine = { true }
                        onChange = { this.handleTextFieldChange.bind(this) }
                        /> < br / >
                        </div>
                        :<div>
                        <h1>EXCELLENT!</h1>
                        <p>You have correctly added <strong>{this.state.repeated.length+this.state.notRepeated.length} </strong> 
                        items to your collection <strong>{this.state.collections[this.state.value].data.title}</strong></p>
                        
                        <h2>New Items</h2>
                        {this.state.notRepeated.join(" - ")}

                        <h2>Repeated Items </h2>
                        {this.state.repeated.join(" - ")}

                        <h2>Items out of collection range</h2>
                        {this.state.invalidItems.join(" - ")}
                        </div> }





                        </Dialog>
                    );
                }
            }



            AddStickers.propTypes = {}

            function mapStateToProps(state, ownProps) {
                console.log(">>>>>>>>> addStickers state collection", state.userCollections.collections);
                return {
                    userData: state.auth.data,
                    collections: state.userCollections.collections
                }
            }

            function mapDispatchToProps(dispatch) {
                return {
                    actions: bindActionCreators(userDataActions, dispatch),
                }
            }

            export default connect(mapStateToProps, mapDispatchToProps)(AddStickers);
