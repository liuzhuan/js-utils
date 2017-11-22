/**
 * get parsed query object from url
 * @param {string} url - the url to be parsed from 
 * @return {object} - parsed query object
 */
function parseQuery(url) {
    if (url.indexOf('?') === -1) {
        return {}
    }

    var search = url.split(/\?|#/)[1]
    return search.split('&')
        .filter(hasEqual)
        .map(function(item) {
            return item.split('=')
        })
        .reduce(function(a, b){
            var obj = {}
            obj[b[0]] = b[1]
            
            return Object.assign({}, a, obj)
        }, {})
}

function hasEqual(val) {
    return val.indexOf('=') !== -1
}

module.exports = parseQuery