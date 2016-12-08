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
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            deepExtend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }

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


