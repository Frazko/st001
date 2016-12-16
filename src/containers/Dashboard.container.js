import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import {  navigateTo } from '../utils';
import CollectionItem from '../components/CollectionItem.component';
import Item from '../components/Item.component';


const style = {
    margin: 12,
};


class Dashboard extends Component {

  

    render() {
        return ( <div>
            <h1> Dashboard </h1>

            <RaisedButton label = "Display My Collections"
            style = { style }
            onClick = {
                () => {
                    navigateTo("/myCollections");
                }
            }
            />

            <Item/>
            <CollectionItem/>

            { /* < Link to = "/myCollections" > Display My Collections < /Link>*/ }





            </div>);
        }
    }

    export default Dashboard
