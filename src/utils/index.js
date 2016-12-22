import { browserHistory } from 'react-router'

import {navBarTitleUpdate} from '../core/navigation/navigationActions.js';



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
    // console.log(" ")
    // console.log(" ")
    // console.log(" ")
    // console.log("*************************************************\\ ");
    // console.log("deepExtend in", Object.assign({}, destination));

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
    // console.log("deepExtend out", destination)
    // console.log("*************************************************/");
    // console.log(" ")
    // console.log(" ")
    // console.log(" ")
    return destination;
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
    console.log("Routing to: ",target);
    browserHistory.push(target);
}