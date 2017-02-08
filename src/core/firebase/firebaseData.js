import { firebaseDb } from '../firebase';
import { deepExtend, trimList } from '../../utils';

const accountsRef = firebaseDb.ref('accounts');
const collectionsRef = firebaseDb.ref('collections');
const usersRef = firebaseDb.ref('users');
var uid = '';
var token = '';

Object.filter = (obj, predicate) =>
    Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});


//-------------------------------------------------------------------------- GET COLLECTIONS DATA FROM FIREBASE  
export function getCollections(userid) {
    console.log(">>>> getCollections", userid);
    uid = userid;
    //TODO:: make flag for new albums added to myAlbums to load info again.
    // ----------------------------------------------------------- get user collections
    return usersRef.child(uid + "/myCollections").once("value")
        .then(snapshot => {
            var reads = [];
            let userCollectiosObj = snapshot.val();
            console.log('userCollectiosObj', userCollectiosObj);
            snapshot.forEach(collectionId => {
                // ----------------------------------------------- get Collection data and merge in user data
                var promise = collectionsRef.child(collectionId.key).once('value')
                    .then(collectionData => {
                        console.log('collectionId.key ', collectionId.key);
                        let obj = {};
                        let items = userCollectiosObj[collectionId.key].items;
                        obj[collectionId.key] = collectionData.val();
                        obj[collectionId.key].data.id = collectionId.key;
                        obj[collectionId.key].iHave = Object.keys(items).length;
                        obj[collectionId.key].iChange = Object.keys(Object.filter(items, item => item.count > 1)).length;
                        // console.log('    items ');
                        deepExtend(obj[collectionId.key].items, userCollectiosObj[collectionId.key].items);
                        // console.log('    ------ getCollections obj ', obj[collectionId.key].items);

                        getFriendsItems(uid, collectionId.key)
                            .then(values => {
                                console.log("::::::::::::: ", values);
                                let fwtc = values.filter(Boolean);
                                console.log("------------- ", fwtc);
                                // if (fwtc.length > 0) {
                                    obj[collectionId.key].friendsWithThisCollection = fwtc;
                                // }
                            }).catch(function(e) {
                                console.error("<<<<<  ERROR getFriendsItems in AddStickers >>>>>", e);
                            });


                        return obj;
                    });
                reads.push(promise);
            });
            return Promise.all(reads);
        });

}

//-------------------------------------------------------------------------- GET FRIENDS ITEMS 
export function getFriendsItems(userid, collectionId) {
    console.log(">>>> getFriendsItems", uid, collectionId);
    // ----------------------------------------------------------- get user collections
    return usersRef.child(uid + "/friends").once("value")
        .then(friends => {
            var reads = [];
            friends.forEach(friend => {
                let friendCollectionRef = usersRef.child(friend.key + "/myCollections/"); //.child(collectionId)
                var promise1 = friendCollectionRef.once('value')
                    .then(friendsData => {
                        var promise2 = undefined
                        if (friendsData.hasChild(collectionId)) {
                            console.log('hasChild', collectionId);
                            promise2 = friendCollectionRef.child(collectionId).once('value')
                                .then(friendCollection => {
                                    let arr = [];
                                    // obj to Array
                                    for (let i in friendCollection.val().items) {
                                        arr[i] = friendCollection.val().items[i]
                                    }
                                    return { friendId: friend.key, items: arr, name: friend.val().name, profileImage: friend.val().profileImage };
                                })

                            // console.log('1 reads', reads);
                        } else {
                            console.log('NO hasChild', collectionId);
                        }
                        return promise2
                    }).then(result => {
                        // console.log('promise1', result);
                        return result;
                    });
                reads.push(promise1);
            });
            // console.log('2 reads', reads);
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

//-------------------------------------------------------------------------- GET ACCOUNT NAMES FROM FIREBASE  
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

//-------------------------------------------------------------------------- ADD STICKERS  
export function addStickers(uid, collection, newItems) {
    console.log(">>>> addStickers ", uid, collection, newItems);
    // ----------------------------------------------------------- add sticker 
    var ref = usersRef.child(uid + "/myCollections/" + collection + "/items");

    return ref.once("value")
        .then(items => {
            // console.log(">>>> ", items.val());
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
            // console.log("::::: ", obj);

            ref.set(obj)
            return Promise.resolve({ repeated, notRepeated });
        })
        // .catch(function(e) {
        //     console.error("<<<<<  ERROR addStickers >>>>>", e);
        // });
}



//-------------------------------------------------------------------------- ADD / REMOVE INDIVIDUAL ITEM  
export function addRemoveItem(itemOrigin, add) {
    //add is boolean.. means adds or removes
    //TODO:: REMOVE ITEM ON  0
    console.log(">>>> addRemoveSticker ", uid, itemOrigin, add);
    // ----------------------------------------------------------- add sticker 
    var itemsRef = usersRef.child(uid + "/myCollections/" + itemOrigin.itemData.collection + "/items");
    // item.itemData.number
    return itemsRef.once("value")
        .then(items => {
            console.log("items", items.val()[itemOrigin.itemData.number.toString()]);
            let obj = {}
            var itemChild = itemsRef.child(itemOrigin.itemData.number);
            console.log("itemChild", itemChild);
            console.log(itemOrigin.itemData.number)
            console.log(items.hasChild(itemOrigin.itemData.number.toString()))

            if (items.hasChild(itemOrigin.itemData.number.toString())) {
                console.log(">>>> ", items.val());
                let count = items.val()[itemOrigin.itemData.number].count || 0;
                let like = items.val()[itemOrigin.itemData.number].like || false;
                if (add) {
                    count++;
                } else {
                    if (count > 0)
                        count--;
                }
                obj['count'] = count;
                if (like)
                    obj['like'] = like;
                console.log("::::: ", obj);
                itemChild.set(obj)
            } else {
                let count = 0;
                if (add) {
                    count = 1;
                }
                let like = itemOrigin.like || false;
                obj['count'] = count;
                if (like)
                    obj['like'] = like;
                itemChild.set(obj)
            }
            return Promise.resolve(obj);
        })
        .catch(function(e) {
            console.error("<<<<<  ERROR addRemoveItem >>>>>", e);
        });
}


//-------------------------------------------------------------------------- add like  
export function addFavorite(itemOrigin, add) {
    console.log(">>>> addRemoveSticker ", uid, itemOrigin, add);
    // ----------------------------------------------------------- add sticker 
    var itemsRef = usersRef.child(uid + "/myCollections/" + itemOrigin.itemData.collection + "/items");
    // item.itemData.number
    return itemsRef.once("value")
        .then(items => {
            let obj = {}
            var itemChild = itemsRef.child(itemOrigin.itemData.number);

            if (items.hasChild(itemOrigin.itemData.number.toString())) {
                console.log(">>>> ", items.val());
                let count = items.val()[itemOrigin.itemData.number].count || 0;
                let like;
                if (add) {
                    like = true;
                } else {
                    like = false;
                }
                obj = { count, like };
                console.log("::::: ", obj);
                itemChild.set(obj)
            } else {
                let count = 0;
                let like;
                if (add) {
                    like = true;
                } else {
                    like = false;
                }

                obj = { count, like };
                itemChild.set(obj)
            }
            return Promise.resolve(obj);
        })
        .catch(function(e) {
            console.error("<<<<<  ERROR addFavorite >>>>>", e);
        });
}



//-------------------------------------------------------------------------- CREATE USER  
export function createUser(result) {
    // console.log("createUser");
    //
    // let uid = "";
    let userChild = "";
    let user = result.user;
    token = result.credential.accessToken;
    console.log("token", result.credential.accessToken);
    //
    usersRef.once("value", snapshot => {
        console.log("***** USER AUTH *****");
        uid = user.providerData[0].uid;
        // console.log(JSON.stringify(user));
        // CHECK IF USER EXISTS
        var userChild = usersRef.child(uid);

        if (snapshot.hasChild(uid)) {
            console.log('************ USER EXISTS ************');
        } else {
            console.log('************ CREATE USER  ************');
            console.log("uid", uid);
            // Create user child 
            userChild.set({
                userData: {
                    //TEST DATA
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email
                }
            });

            // // test get user Image
            // FB.api('/me/picture?width=180&height=180', { access_token: token },
            //     response => {
            //         console.log("Profile pic", response.data.url);
            //     });


        }

        // test get user FRIENDS
        FB.api('/me/friends', { access_token: token },
            response => {
                // console.log("friends", response.data);
                let friends = {};
                for (let friend of response.data) {
                    friends[friend.id] = { name: friend.name };
                }
                // console.log("friends", friends);

                storeImages(friends).then((result) => {
                    console.log("friends then >>> ", friends);
                    userChild.child("friends").set(friends);
                });
            });


    });

}

function storeImages(friends) {
    var reads = [];
    for (let friend in friends) {
        // console.log('>>>> ', friend);
        var promise = new Promise(
            (resolve, reject) => {
                FB.api('/' + friend + '/picture?width=180&height=180', { access_token: token },
                    response => {
                        if (response && !response.error) {
                            // console.log("image URL", response.data.url);
                            resolve(friends[friend].profileImage = response.data.url);
                        }
                    }
                );
            })
        reads.push(promise);
    };
    return Promise.all(reads);
}