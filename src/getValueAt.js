/**
 * mimick the behavior of `_.at(object, [paths])` from lodash
 * except path is a string, not Array.
 * So only single data can be retrieved
 * 
 * @param {object} obj 
 * @param {string} path 
 */
function getValueAt(obj, path, defaultValue) {
    if (!obj) return defaultValue;

    // return itself if path is empty
    if (isEmptyString(path)) return obj;

    const path_arr = parsePath(path);
    if (!path_arr || path_arr.length <= 0) return defaultValue;

    let matchedValue = obj;
    for (let i = 0; i < path_arr.length; i++) {
        const key = path_arr[i];
        matchedValue = matchedValue[key];
        if (!matchedValue) return defaultValue;
    }

    return matchedValue ? matchedValue : defaultValue;
}

function isEmptyString(str) {
    if (!str) return true;

    return !String(str).trim();
}

function parsePath(path) {
    if (!path) return;
    
    const tokens = path.split(/\.|\[|\]/);
    return tokens.filter(item => !isEmptyString(item));
}

module.exports = getValueAt;