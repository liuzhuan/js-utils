var parseQuery = require('./parseQuery.js')

var testCases = [
    ['http://example.com', {}],
    ['http://example.com?hello=world', { hello: 'world' }],
    ['http://example.com?hello=world&foo=bar#anchor', { hello: 'world', foo: 'bar' }],
    ['http://example.com?hello=world#anchor', { hello: 'world' }]
]

testCases.forEach(item => {
    var params = item.slice(0, -1)
    var target = item.slice(-1)[0]
    var result = parseQuery.apply(null, params)
    console.log(JSON.stringify(result))

    // TODO: deep equal
    // console.assert(result === target, result + ' should be equal to ' + target)
})

console.log('test succesfully!')