/**
 * 更新 url 中的页面参数
 * @param {string} url 待处理的 url
 * @param {object} params 待更新的页面参数
 */
function update(url, params) {
    const {
        path,
        search,
        hash,
    } = parseURL(url);

    const newSearch = updateSearch(search, params);

    return path + newSearch + hash;
}

/**
 * 删除 URL 中制定的页面参数，参数由 key 指定
 * @param {string} url 待处理的 url
 * @param {string|Array.<string>} keys 待删除的键值
 */
function del(url, keys) {
    const {
        path,
        search,
        hash,
    } = parseURL(url);

    const newSearch = delSearch(search, keys);

    return path + newSearch + hash;
}

/**
 * 更新页面字符串，search 不包含 params 的数值，则增加
 * @param {string} search 
 * @param {object} params 
 * @returns {string}
 */
function updateSearch(search, params) {
    const searchObj = parseSearch(search);
    const newSearchObj = { ...searchObj, ...params };
    return stringifySearch(newSearchObj);
}

/**
 * 解析页面参数
 * @param {string} search 
 * @returns {object}
 */
function parseSearch(search) {
    if (!search) return {};

    const res = {};
    search = search.replace(/^\?/, '');
    const pairs = search.split('&');
    pairs.forEach(item => {
        const [key, value] = item.split('=');
        res[key] = value;
    })

    return res;
}

/**
 * 将对象连接成符合规范的页面参数
 * @param {object} params 
 */
function stringifySearch(params) {
    if (!params) return '';
    const keys = Object.keys(params);
    if (keys.length <= 0) return '';

    const res = keys.map(key => {
        return key + '=' + params[key];
    });

    return '?' + res.join('&');
}

/**
 * 删除指定的键值
 * @param {string} search 
 * @param {string|Array.<string>} keys 
 */
function delSearch(search, keys) {
    if (!keys || keys.length <= 0) return search;

    const searchObj = parseSearch(search);
    if (typeof keys === 'string') {
        keys = [keys];
    }
    const newSearchObj = { ...searchObj };
    keys.forEach(key => {
        if (newSearchObj.hasOwnProperty(key)) {
            delete newSearchObj[key];
        }
    })
    
    return stringifySearch(newSearchObj);
}

/**
 * 将 URL 拆分为 path, search, hash 三部分
 * @param {string} url 
 */
function parseURL(url) {
    if (!url) return null;

    let path = url;
    let search = '';
    let hash = '';

    const hashIndex = url.indexOf('#');
    const searchIndex = url.indexOf('?');

    if (hashIndex !== -1) {
        hash = path.slice(hashIndex);
        path = path.slice(0, hashIndex);
    }

    if (searchIndex !== -1) {
        search = path.slice(searchIndex);
        path = path.slice(0, searchIndex);
    }

    return {
        path,
        search,
        hash
    }
}

module.exports = {
    update,
    del,
    parseURL,
    parseSearch,
    stringifySearch,
}