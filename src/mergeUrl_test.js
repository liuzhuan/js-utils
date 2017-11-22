var mergeUrl = require('./mergeUrl.js')

var testCases = [
    ['http://example.com', 'foo=bar', 'http://example.com?foo=bar'],
    ['http://example.com?hello=world', 'foo=bar', 'http://example.com?hello=world&foo=bar'],
    ['http://example.com#anchor', 'foo=bar', 'http://example.com?foo=bar#anchor'],
    ['http://example.com?hello=world#anchor', 'foo=bar', 'http://example.com?hello=world&foo=bar#anchor']
]

testCases.forEach(item => {
    var params = item.slice(0, -1)
    var target = item.slice(-1)[0]
    var result = mergeUrl.apply(null, params)
    console.assert(result === target, result + ' should be equal to ' + target)
})

console.log('test succesfully!')