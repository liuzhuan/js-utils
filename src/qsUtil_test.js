const qsUtil = require('./qsUtil')

const { path, search, hash } = qsUtil.parseURL('https://example.com.cn/hello/world?name=you&age=42#anchor')
console.assert(path === 'https://example.com.cn/hello/world', 'path should be "https://example.com.cn/hello/world"')
console.assert(search === '?name=you&age=42', 'search should be "?name=you&age=42"')
console.assert(hash === '#anchor', 'hash should be "#anchor"')

const obj = qsUtil.parseSearch('?name=foo&age=42&hello=world')
console.assert(obj.name === 'foo', 'name should be foo')
console.assert(obj.age === '42', 'age should be 42')
console.assert(obj.hello === 'world', 'hello should be world')

const str = qsUtil.stringifySearch({ name: 'foobar', age: 42 })
console.assert(str === '?name=foobar&age=42', 'stringifySearch should be wrong')

let updatedURL = qsUtil.update('http://example.com/foo/bar?name=baz&age=42#anchor');
console.assert(updatedURL === 'http://example.com/foo/bar?name=baz&age=42#anchor', 'updatedURL should be the same as before');

updatedURL = qsUtil.update('http://example.com/foo/bar?name=baz&age=42#anchor', { name: 'foobar' })
console.assert(updatedURL === 'http://example.com/foo/bar?name=foobar&age=42#anchor', 'updatedURL should be "http://example.com/foo/bar?name=foobar&age=42#anchor"')

updatedURL = qsUtil.update('http://example.com/foo/bar?name=baz&age=42#anchor', { name: 'foobar', height: 136 })
console.assert(updatedURL === 'http://example.com/foo/bar?name=foobar&age=42&height=136#anchor', 'updatedURL should be "http://example.com/foo/bar?name=foobar&age=42&height=136#anchor"')

let deletedURL = qsUtil.del('http://example.com/foo/bar?name=baz&age=42#anchor')
console.assert(deletedURL === 'http://example.com/foo/bar?name=baz&age=42#anchor', 'deletedURL should keep the same')

deletedURL = qsUtil.del('http://example.com/foo/bar?name=baz&age=42#anchor', 'age');
console.assert(deletedURL === 'http://example.com/foo/bar?name=baz#anchor', 'deletedURL should be "http://example.com/foo/bar?name=baz#anchor"')

deletedURL = qsUtil.del('http://example.com/foo/bar?name=baz&age=42#anchor', ['age', 'name']);
console.assert(deletedURL === 'http://example.com/foo/bar#anchor', 'deletedURL should be "http://example.com/foo/bar#anchor"')

console.log('DONE')