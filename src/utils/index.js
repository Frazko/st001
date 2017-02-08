import { browserHistory } from 'react-router';

import { navBarTitleUpdate } from '../core/navigation/navigationActions.js';



export function extend(obj, src) {
    for (var key in src) {
        // console.warn("-- prop", key);
        if (!obj.hasOwnProperty(key)) {
            // console.warn("     ---- NEW prop", key);
            obj[key] = src[key];
        }
    }
    return obj;
}


export function deepExtend(destination, source) {

    for (let property in source) {
        // console.log(" .  ");
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            // console.log(" . . . ");
            destination[property] = destination[property] || {};
            deepExtend(destination[property], source[property]);
        } else {
            // console.log(" . . . . . . ");
            destination[property] = source[property];
        }
    }
    return destination;
}


export function mergeFriends(destination, source) {
    source.forEach((item, i) => {
        if (destination[i] != -1) {
            console.log(i, "-- ", item.like);

            let likes = (destination[i].likes || 0);
            let owners = (destination[i].owners || 0);

            destination[i].likes = (item.hasOwnProperty('like')) ? ++likes : likes;
            destination[i].owners = (item.count > 1) ? ++owners : owners;

            console.log(i, "-- ", destination[i].likes);
        }
    });
}


Object.filter = (obj, predicate) =>
    Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});



export function windowResize() {
    let heightUpdated = window.innerHeight - 100;
    // console.warn('heightUpdated ',heightUpdated);
    document.getElementById("root").style.height = heightUpdated + "px";
    return heightUpdated;
}

export function navigateTo(target) {
    console.log("Routing to: ", target);
    browserHistory.push(target);
}

export function validateNumericOnly(val) {
    return /^(?=.*\d)[\d ]+$/.test(val)
}

export function validateInRange(list, range) {
    return trimList(list).filter((item, i) => (item <= range));
}

export function outOfRange(list, range) {
    return trimList(list).filter((item, i) => (item > range));
}

export function trimList(list) {
    return list.split(" ").filter(function(entry) {
        return (entry.trim() != '' && entry.trim() != 0);
    });
}

export function uniqueInList(list) {
    return list.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
}