import firebase from 'firebase';
import { firebaseDb } from '../firebase';



//-------------------------------------------------------------------------- CREATE USER  



export function createUser(result) {
    console.log("createUser");
    //
    console.log("token", result.credential.accessToken);
    let uid = "";
    let userChild = "";
    let token = result.credential.accessToken;
    let user = result.user;
    //
    firebaseDb.ref('users').once("value", function(snapshot) {
        uid = user.providerData[0].uid;
        console.log(JSON.stringify(user));

        // CHECK IF USER EXISTS
        if (snapshot.hasChild(uid)) {
            console.log('************ USER EXISTS ************');
        } else {
            console.log('************ CREATE USER  ************');
            console.log("uid", uid);
            // Create user child 
            var ref = firebaseDb.ref('users');
            userChild = ref.child(uid);
            userChild.set({
                userData: {
                    //TEST DATA
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email
                }
            });

            // test get user Image
            FB.api('/me/picture?width=180&height=180', { access_token: token },
                (response) => {
                    console.log("Profile pic", response.data.url);
                });


            // test get user FRIENDS
            FB.api('/me/friends', { access_token: token },
                (response) => {
                    console.log("friends", response.data);
                    let friends = {};
                    for (let friend of response.data) {
                        friends[friend.id] = true;
                    }
                    console.log("friends", friends);
                    userChild.child("friends").set(friends);
                });

        }


    });

}
