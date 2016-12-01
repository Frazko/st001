import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';


const style = {
    margin: 12,
};


class Dashboard extends Component {


    navigateTo(target) {
        console.log(target);
        browserHistory.push(target);
    }



    render() {
        return ( < div >
            < h1 > Dashboard < /h1>

            < RaisedButton label = "Display My Collections"
            style = { style }
            onClick = {
                () => {
                    this.navigateTo("/myCollections");
                }
            }
            />



			{/*             //TODO::         */}

            {/* < Link to = "/myCollections" > Display My Collections < /Link>*/}






            < /div>);
        }
    }

    export default Dashboard
