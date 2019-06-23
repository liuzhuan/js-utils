const getValueAt = require('./getValueAt');

const obj = {
    a: [
        {
            b: {
                c: 3,
            }
        },
        4
    ],
    b: {
        c: {
            d: 38
        }
    }
}

let value = getValueAt(obj, 'a[0].b.c');
console.log(value, 'should be 3');

value = getValueAt(obj, 'a[1]');
console.log(value, 'should be 4');

value = getValueAt(obj, 'a[2]');
console.log(value, 'should be undefined');

value = getValueAt(obj, 'a[2]', 42);
console.log(value, 'should be 42');

value = getValueAt(obj, 'b.c.d[3]');
console.log(value, 'should be undefined');

value = getValueAt(obj, 'b.c.d');
console.log(value, 'should be 38');