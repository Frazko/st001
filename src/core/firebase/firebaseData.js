import { firebaseDb } from '../firebase';



//-------------------------------------------------------------------------- CREATE USER  
const accountsRef = firebaseDb.ref('accounts');
const collectionsRef = firebaseDb.ref('collections');
const usersRef = firebaseDb.ref('users');

export function getCollections(uid) {
    console.log("getCollections", uid);
    let collections = {};
    usersRef.child(uid + "/myCollections").once("value")
        .then((snapshot) => {
            console.log("*********");
            //console.log("snaap", snapshot.key);

            snapshot.forEach(function(collectionId) {
                // console.log("  -col", collectionId.key);
                // 
                collectionsRef.child(collectionId.key).once('value')
                .then((collectionData) => {
                    //console.log("*********", collectionData.val());
                    collections[collectionId.key] = collectionData.val();
                    console.log("---");
                })
                console.log("-");
            });
            console.log("--");

            return collections;
        })
        .then((collections) => {
            console.log("========", collections);
            console.log(collections, JSON.stringify(collections));
        });


}

export function createUser(result) {
    console.log("createUser");
    //
    console.log("token", result.credential.accessToken);
    let uid = "";
    let userChild = "";
    let token = result.credential.accessToken;
    let user = result.user;
    //
    usersRef.once("value", function(snapshot) {
        console.log("***** USER AUTH *****")
        uid = user.providerData[0].uid;
        // console.log(JSON.stringify(user));
        // CHECK IF USER EXISTS
        if (snapshot.hasChild(uid)) {
            console.log('************ USER EXISTS ************');
        } else {
            console.log('************ CREATE USER  ************');
            console.log("uid", uid);
            // Create user child 
            var userChild = usersRef.child(uid);
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
