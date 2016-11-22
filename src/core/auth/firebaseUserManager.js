import firebase from 'firebase';
import { firebaseDb } from '../firebase';



//-------------------------------------------------------------------------- CREATE USER  



export function createUser(result) {
    console.log("createUser");
    //
    console.log("token", result.credential.accessToken);
    let token = result.credential.accessToken;
    let user = result.user;
    //
    firebaseDb.ref('users').once("value", function(snapshot) {

        // CHECK IF USER EXISTS
        if (snapshot.hasChild(user.uid)) {
            console.log('************ USER EXISTS ************');
        } else {
            console.log('************ CREATE USER  ************');
            // Create user child 
            var ref = firebaseDb.ref('users');
            ref.child(user.uid).set({
                userData: {
                	//TEST DATA
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email
                }
            });
        }
        // test get user Image
        FB.api('/me/picture?width=180&height=180', { access_token: token },
            (response) => {
                console.log("Profile pic", response.data.url);
            });
        // test get user FRIENDS
        FB.api('/me/friends', { access_token: token },
            (response) => {
                console.log("friends", response.data);
            });

    });

}
