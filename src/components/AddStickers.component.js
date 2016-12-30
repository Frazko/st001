import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userDataActions from '../core/collectionsData/dataActions';

import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { getCollections, addStickers } from "../core/firebase/firebaseData"

import { validateNumericOnly, validateInRange, outOfRange, uniqueInList } from '../utils';

const style= {
  addedItemsResponse:{
    color:'#339933',
    lineHeight:1.2,
    marginBottom:14,
  },
  addedItemsResponseRepeated:{
    color:'#4444AA',
    lineHeight:1.2,
    marginBottom:14,
  },
  addedItemsResponseInvalid:{
    color:'#DD6666',
    lineHeight:1.2,
    marginBottom:14,
  },

  errorHintStyle: {
    color: '#FF6666',
  },
  normalHintStyle: {
    color: '#999999',
  },
  errorUnderlineStyle: {
    borderColor: '#ffaaaa',
  },
  normalUnderlineStyle: {
    borderColor: '#999999',
  },
  errorUnderlineFocusStyle: {
    borderColor: '#ff6666',
  },
  normalUnderlineFocusStyle: {
    borderColor: '#999999',
  },
  errorFloatingLabelStyle: {
    color: '#ff6666',
  },
  normalFloatingLabelStyle: {
    color: '#999999',
  },
}

class AddStickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      collections: [],
      textFieldValue: "",
      itemsSent:false,
      invalidItems:[],
      repeated:[],
      notRepeated:[],
      error:false,
      snackOpen: false,
      okIsDisabled: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("******************* addStickers HAY DATOS DE COLLECTIONS EN STORE componentWillReceiveProps*", nextProps.collections)
    let collections = nextProps.collections.map(item => item[Object.keys(item)[0]]);
    this.setState({ collections: collections });
  }

  close() {
    this.state.itemsSent=false;
    this.state.textFieldValue="";
    style.normalFloatingLabelStyle.color = '#999999';
    style.normalUnderlineStyle.borderColor = '#999999';
    style.normalUnderlineFocusStyle.borderColor = '#999999';
    this.props.handleClose();
    this.setState({error:false});
  }


  handleAddStickers() {
    // console.log("handleAddStickers()");
    // console.log("test ", validateNumericOnly(this.state.textFieldValue));

    if (this.state.itemsSent){
      this.close();
      return;
    }

    console.log("handleAddStickers()");

    if (validateNumericOnly(this.state.textFieldValue)) {
      let collectionLength = this.state.collections[this.state.value].items.length;
      let validItems = validateInRange(this.state.textFieldValue, collectionLength);
      let invalidItems = outOfRange(this.state.textFieldValue, collectionLength);

      //1 2 3 4  10 11 12 13 5 6 7 8 9  1 2 3 1 4 2 3 5 4 46 43 21 22 3 1 4 6 7 


      addStickers(this.props.userData.providerData[0].uid, this.state.collections[this.state.value].data.id, validItems)
      .then((response)=>{
        // console.log("response>> ", response);

        // console.log("validItems>> ", uniqueInList(validItems).sort());
        // console.log("invalidItems>> ", uniqueInList(invalidItems).sort());
        // console.log("repeated stickers>> ", uniqueInList(response.repeated).sort());
        // console.log("Not repeated stickers>> ", uniqueInList(response.notRepeated).sort());

        this.setState({ 
          validItems:uniqueInList(validItems).sort(), 
          invalidItems:uniqueInList(invalidItems).sort(),
          repeated:uniqueInList(response.repeated).sort(),
          notRepeated:uniqueInList(response.notRepeated).sort(),

          textFieldValue:"",
          itemsSent:true,
          okIsDisabled: false,
        });

      })

    } else {
      this.errorAlert("Not Numeric");
    };
  }

  errorAlert(error) {
    console.log(error);

    this.setState({ 
      textFieldValue:"",
      error:true,
      snackOpen: true,
      okIsDisabled: true,
    });
    

    this.textInput.focus();


  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    // console.log("Selected ", this.state.collections[this.state.value]);
    // console.log("new items ", this.state.textFieldValue.split(" "));
    // console.log("Selected ", this.state.collections[value].items.length);
  };

  handleTextFieldChange(event, value) {
    style.normalFloatingLabelStyle.color  = '#339933';
    style.normalUnderlineStyle.borderColor      = '#339933';
    style.normalUnderlineFocusStyle.borderColor = '#339933';

    this.setState({
      textFieldValue: value,
      okIsDisabled: false,
      error:!validateNumericOnly(value),
    });

    console.log("error", this.state.error);
  }

  onInputBlur(){
    if(!this.state.textFieldValue){
      style.normalFloatingLabelStyle.color  = '#999999';
      style.normalUnderlineStyle.borderColor      = '#999999';
      style.normalUnderlineFocusStyle.borderColor = '#999999';
      this.setState({error:false});
    }
  }

  handleRequestClose() {
    this.setState({
      snackOpen: false,
    });
  };


  render() {
    console.log("*** RENDER addStickers *** ");
    const actions = [ <FlatButton
    label = "Cancel"
    primary = { true }
    onTouchTap = { this.close.bind(this) }
    />,   <FlatButton
    label = "Ok"
    primary = { true }
    disabled={this.state.okIsDisabled}
    onTouchTap = { this.handleAddStickers.bind(this) }
    />
    ];


    const haveNotRepeated = this.state.notRepeated.length>0?  <div style={style.addedItemsResponse}><h2>{this.state.notRepeated.length} New Items</h2> {this.state.notRepeated.join(" - ")}</div>:null;
    const haveRepeated    = this.state.repeated.length>0?     <div style={style.addedItemsResponseRepeated}><h2>{this.state.repeated.length} Duplicated Items</h2> {this.state.repeated.join(" - ")}</div>:null;
    const haveOutOfRange  = this.state.invalidItems.length>0? <div style={style.addedItemsResponseInvalid}><h2>{this.state.invalidItems.length} Invalid Items</h2> {this.state.invalidItems.join(" - ")}</div>:null;


    let list = (this.state.collections.length) ? this.state.collections.map((item, i) => ( <MenuItem key = { i }
      id = { item.data.id }
      value = { i }
      primaryText = { item.data.title }
      />)):undefined;

    let noItems = <MenuItem value = { 1 } primaryText = "Please add a collection first. " /> ;

    // console.log("Render error", this.state.error);
    // console.log(style);

    return ( <Dialog title = "Add Stickers"
      actions = { actions }
      modal = { true }
      open = { this.props.visible } >


      { !this.state.itemsSent ?  
        <div>
        <SelectField floatingLabelText = "Select Collection"
        value = { this.state.value }
        onChange = { this.handleChange }
        fullWidth = { true } >

        { list || noItems }

        </SelectField>


        <br />

        <TextField 
        id="addStickersTF"
        ref={(input) => { this.textInput = input; }}
        hintText = "Only numbers separated by spaces, for example: 10 2 14 122"
        floatingLabelText = "Add Sticker Numbers"
        fullWidth = { true }
        value = { this.state.textFieldValue }
        multiLine = { true }
        onChange = { this.handleTextFieldChange.bind(this) }
        onBlur = { this.onInputBlur.bind(this) }
        hintStyle={               this.state.error?style.errorHintStyle           :style.normalHintStyle}
        underlineStyle={          this.state.error?style.errorUnderlineStyle      :style.normalUnderlineStyle}
        underlineFocusStyle={     this.state.error?style.errorUnderlineFocusStyle :style.normalUnderlineFocusStyle}
        floatingLabelStyle={      this.state.error?style.errorFloatingLabelStyle  :style.normalFloatingLabelStyle}
        floatingLabelFocusStyle={ this.state.error?style.errorFloatingLabelStyle  :style.normalFloatingLabelStyle}
        
        rowsMax={2}
        rows={2}
        /> < br / >
        </div>
        :<div>
        <h1>Excellent!</h1>
        <p>You have correctly added <strong>{this.state.repeated.length+this.state.notRepeated.length} </strong> 
        items to your <strong>{this.state.collections[this.state.value].data.title}</strong> collection</p>

        {haveNotRepeated}
        {haveRepeated}
        {haveOutOfRange}

        </div>
      }
      <Snackbar
          open={this.state.snackOpen}
          message="Please add only numbers and spaces."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </Dialog>
      );
  }
}

AddStickers.propTypes = {}

function mapStateToProps(state, ownProps) {
  // console.log(">>>>>>>>> addStickers state collection", state.userCollections.collections);
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
