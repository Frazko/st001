import { firebaseDb } from '../firebase';
import { deepExtend, trimList } from '../../utils';

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
    //TODO:: make flag for new albums added to myAlbums to load info again.
    // ----------------------------------------------------------- get user collections
    return usersRef.child(uid + "/myCollections").once("value")
        .then(snapshot => {
            var reads = [];
            let userCollectiosObj = snapshot.val();
            // console.log('userCollectiosObj', userCollectiosObj);
            snapshot.forEach(collectionId => {
                // ----------------------------------------------- get Collection data and merge in user data
                var promise = collectionsRef.child(collectionId.key).once('value')
                    .then(collectionData => {
                        // console.log('collectionId.key ', collectionId.key);
                        let obj = {};
                        let items = userCollectiosObj[collectionId.key].items;
                        obj[collectionId.key] = collectionData.val();
                        obj[collectionId.key].data.id = collectionId.key;
                        obj[collectionId.key].iHave = Object.keys(items).length;
                        obj[collectionId.key].iChange = Object.keys(Object.filter(items, item => item.count > 1)).length;
                        // console.log('    items ');
                        deepExtend(obj[collectionId.key].items, userCollectiosObj[collectionId.key].items);
                        // console.log('    ------ getCollections obj ', obj);
                        return obj;
                    });
                reads.push(promise);
            });
            return Promise.all(reads);
        });

}

//-------------------------------------------------------------------------- GET NEW COLLECTIONS DATA FROM FIREBASE  
export function getNewCollections(uid) {
    console.log(">>>> getNewCollections", uid);
    //TODO :: get albums not in my list 
    // ----------------------------------------------------------- save user collections to list
    return usersRef.child(uid + "/myCollections").once("value")
        .then(snapshot => {
            var myCollectionsList = [];
            snapshot.forEach(collectionId => {
                myCollectionsList.push(collectionId.key);
            });
            return myCollectionsList;
        })
        .then(myCollectionsList => {
            console.log("=>>> ***  myCollectionsList:: ", myCollectionsList);
            return collectionsRef.once('value')
                .then(collectionData => {
                    var nList = [];
                    collectionData.forEach(collection => {
                        // console.log("=>>> index :: ", collection.key, myCollectionsList.indexOf(collection.key) < 0);
                        if (myCollectionsList.indexOf(collection.key) < 0) {
                            var collections = {};
                            collections[collection.key] = collection.val();
                            nList.push(collections);
                        }
                    });
                    // var nList = Object.keys(collectionData.val()).filter(collection => !myCollectionsList.indexOf(collection))
                    // console.log("=>>> nList *** ", nList);
                    return nList;
                });
        });
}

//-------------------------------------------------------------------------- ADD MY COLLECTIONS   
export function addToMyCollections(uid, collectionId) {
    var ref = usersRef.child(uid);
    return ref.once("value")
        .then(snapshot => {
            // console.log(">>>> !ref.hasChild(myCollections)", !snapshot.hasChild("myCollections"));
            if (!snapshot.hasChild("myCollections")) {
                snapshot.child("myCollections");
                let obj = {};
                obj[collectionId] = { items: [-1] };
                console.log(">>>> obj", obj);
                let collectionChild = ref.child("myCollections");
                collectionChild.set(obj);
            } else {
                let newCollectionRef = usersRef.child(uid + "/myCollections").child(collectionId);
                newCollectionRef.set({ items: [-1] });
            }
            return true;
        })
        .catch(function(e) {
            console.error("<<<<<  ERROR addToMyCollections >>>>>", e);
            return false;
        });
}


//-------------------------------------------------------------------------- GET COLLECTIONS NAMES FROM FIREBASE  
export function getCollectionsNames() {
    // console.log(">>>> getCollectionsNames");
    // ----------------------------------------------------------- get user collections
    return collectionsRef.once("value")
        .then(snapshot => {
            let names = [];
            // console.log('    ');
            snapshot.forEach(collectionId => {
                let obj = {};
                obj[collectionId.key] = collectionId.val();
                names.push(obj);
                // console.log('    ------ getCollectionsNames obj ', obj);
            });
            // console.log('    ');
            return Promise.resolve(names);
        });

}

//-------------------------------------------------------------------------- GET COLLECTIONS NAMES FROM FIREBASE  
export function getAccountNames() {
    // console.log(">>>> getAccountNames");
    // ----------------------------------------------------------- get user collections
    return accountsRef.once("value")
        .then(snapshot => {
            let names = [];
            snapshot.forEach(accountId => {
                let obj = {};
                obj[accountId.key] = accountId.val();
                names.push(obj);
                // console.log('    ------ getAccountNames obj ', obj);
            });
            // console.log('    ');
            return Promise.resolve(names);
        });

}

//-------------------------------------------------------------------------- GET COLLECTIONS NAMES FROM FIREBASE  
export function addStickers(uid, collection, newItems) {
    console.log(">>>> addStickers ", uid, collection, newItems);
    // ----------------------------------------------------------- add sticker 
    var ref = usersRef.child(uid + "/myCollections/" + collection + "/items");

    return ref.once("value")
        .then(items => {
            console.log(">>>> ", items.val());
            let obj = {};

            items.forEach(item => {
                obj[item.key] = item.val();
            })

            let repeated = [];
            let notRepeated = [];
            newItems.forEach(newItem => {
                //console.log("----  ", newItem);
                if (obj[newItem]) {
                    obj[newItem].count++;
                    repeated.push(newItem);
                } else {
                    obj[newItem] = { count: 1 };
                    notRepeated.push(newItem);
                }
            });
            console.log("::::: ", obj);
            ref.set(obj)
            return Promise.resolve({repeated, notRepeated});
        })
        // .catch(function(e) {
        //     console.error("<<<<<  ERROR addStickers >>>>>", e);
        // });
}




//-------------------------------------------------------------------------- CREATE USER  
export function createUser(result) {
    // console.log("createUser");
    //
    // console.log("token", result.credential.accessToken);
    let uid = "";
    let userChild = "";
    let token = result.credential.accessToken;
    let user = result.user;
    //
    usersRef.once("value", snapshot => {
        console.log("***** USER AUTH *****");
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
