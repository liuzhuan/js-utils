/**
 * add an new query parameters to url
 * 
 * @param {string} url - url, maybe with ?, # or not
 * @param {string} query - such as 'foo=bar&hello=world'
 * @return {string} - the merged url
 */
function mergeUrl(url, query) {
    if (url.indexOf('#') !== -1) {
        var parts = url.split('#')
        return mergeUrl(parts[0], query) + '#' + parts[1]
    }

    if (url.indexOf('?') !== -1) {
        return url + '&' + query
    }

    return url + '?' + query
}

module.exports = mergeUrl