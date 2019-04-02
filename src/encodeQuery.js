/**
 * encode options into querystring, like ?a=b&c=d etc.
 * @param {object} options 
 * @param {boolean} useEncode 
 * @returns {string}
 */
function encodeQuery(options, useEncode) {
    if (!options) return '';

    const keys = Object.keys(options);
    if (keys.length <= 0) return '';
    
    return '?' + keys.map(key => {
            let value = options[key];
            if (useEncode) {
                value = encodeURIComponent(value);
            }
            return key + '=' + value;
        })
        .join('&');
}

module.exports = encodeQuery;