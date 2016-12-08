import { firebaseDb } from '../firebase';
import { deepExtend } from '../../utils';

const accountsRef = firebaseDb.ref('accounts');
const collectionsRef = firebaseDb.ref('collections');
const usersRef = firebaseDb.ref('users');

Object.filter = (obj, predicate) =>
    Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});


//-------------------------------------------------------------------------- GET COLLECTIONS DATA FROM FIREBASE  
export function getCollections(uid) {
    console.log(">>>> getCollections", uid);
    // ----------------------------------------------------------- get user collections
    return usersRef.child(uid + "/myCollections").once("value")
        .then(snapshot => {
            var reads = [];
            let userCollectiosObj = snapshot.val();

            snapshot.forEach(collectionId => {
                // ----------------------------------------------- get Collection data and merge in user data
                console.log('get Collection data ');
                var promise = collectionsRef.child(collectionId.key).once('value')
                    .then(collectionData => {
                        let obj = {}, items = userCollectiosObj[collectionId.key].items;
                        obj[collectionId.key] = collectionData.val();
                        obj[collectionId.key].iHave = Object.keys(items).length;
                        obj[collectionId.key].iChange = Object.keys(Object.filter(items, item => item.count > 1)).length; 
                        // console.warn("items",items); 
                        // console.warn("len",Object.filter(items, item => item.count > 10)); 
                        // console.warn("iChange:", obj[collectionId.key].iChange);
                        deepExtend(obj[collectionId.key], userCollectiosObj[collectionId.key]);
                        // console.log('COL >> ', obj[collectionId.key]);
                        return obj;
                    });

                reads.push(promise);
            });
            return Promise.all(reads);
        });
}


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
    usersRef.once("value", snapshot => {
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
                response => {
                    console.log("Profile pic", response.data.url);
                });


            // test get user FRIENDS
            FB.api('/me/friends', { access_token: token },
                response => {
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
