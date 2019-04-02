const encodeQuery = require('./encodeQuery');

testPrint();
testPrint({});
testPrint({ name: 'foobar' });
testPrint({ name: 'foobar', age: 42 });
testPrint({ name: 'foobar', zh: '测试' });
testPrint({ name: 'foobar', zh: '测试' }, true);

function testPrint(options, useEncode) {
    console.log(`encodeQuery(${JSON.stringify(options) || ''}) = ${JSON.stringify(encodeQuery(options, useEncode))}`);
}