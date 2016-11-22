import firebase from 'firebase';
import { firebaseDb } from '../firebase';



//-------------------------------------------------------------------------- CREATE USER  



export function createUser(result) {
    console.log("createUser");
    // console.log("createUser", JSON.stringify(result));
    //console.log("accessToken", result.credential.accessToken, check_Availability);
    this.check_Availability(result);

    // FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));
}

export function check_Availability(result) {
    console.log("token", result.credential.accessToken);
    let token = result.credential.accessToken;
    let user = result.user;
    //
    firebaseDb.ref('users').once("value", function(snapshot) {
        if (snapshot.hasChild(user.uid)) {
            console.log('************ USER exists ************');
        } else {
            console.log('************ USER Created ************');
            //Create user child 
            var ref = firebaseDb.ref('users');
            ref.child(user.uid).set({
                userData: {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email
                }
            });
        }

        FB.api('/me/picture?width=180&height=180', { access_token: token },
            (response) => {
                console.log("Profile pic", response.data.url);
            });

        FB.api('/me/friends', { access_token: token },
            (response) => {
                console.log("friends", response.data);
            });

    });

}


/*
    	





        
            FB.api('/me/picture?width=180&height=180', (response) => {
                // var picUrl = '<img src="http://graph.facebook.com/' + response.id + '/picture" />';
                //  http://graph.facebook.com/10154055323235269/picture
                console.log("Profile pic", response);
                // this.setState({
                //     profilePic: response.data.url
                // });

                // Disparar update IMAGE 
            });

            FB.login((response) => {
                console.log('Welcome!  Fetching your information ');
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    this.FB.api('/me', (response) => {
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'user_friends, public_profile, user_birthday, email, user_about_me' });
            

    window.firebaseDb = firebaseDb;

    // Test for the existence of certain keys within a DataSnapshot
    // var ref = firebase.database().ref("users/ada");
    // ref.once("value")
    //     .then(function(snapshot) {
    //         var a = snapshot.exists(); // true
    //         var b = snapshot.child("name").exists(); // true
    //         var c = snapshot.child("name/first").exists(); // true
    //         var d = snapshot.child("name/middle").exists(); // false
    //     });
    */

export function onStatusChange(response) {
    console.log('onStatusChange', token);
    console.log(response);

    if (response.status === "connected") {
        // this.state.isLoggedIn = true;
        // this.state.loginBtn = "Salir";

        this.FB.api('/me',
            response => {
                var message = "Welcome " + response.name;
                // this.setState({
                //     message: message
                // });
                console.log("me", response);

                // Disparar USER save en firebase
            });

        this.FB.api('/me/picture?width=180&height=180',
            (response) => {
                // var picUrl = '<img src="http://graph.facebook.com/' + response.id + '/picture" />';
                //  http://graph.facebook.com/10154055323235269/picture
                console.log("Profile pic", response.data.url);
                // this.setState({
                //     profilePic: response.data.url
                // });

                // Disparar update IMAGE 
            });

        this.FB.api('/me/friends', { fields: 'name,id,location,birthday', access_token: token },
            (response) => {
                console.log("friends", response.data);
                console.log("--", this.friendsList(response.data));


                // this.setState({
                //     friendsList: this.friendsList(response.data)
                // });

                console.log(this.state.friendsList);

            });
    }
}
