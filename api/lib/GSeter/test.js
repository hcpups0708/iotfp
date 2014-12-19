var GSeter = require('./GSeter');

var me = new GSeter();
var we = new GSeter(10);

console.log(me.get());
me.set(3);
console.log(me.get());
me.set(5);
console.log(me.get());
me.set(1,1);
console.log(me.get());

console.log('---------');
console.log(we.get());
we.set(1,1);
console.log(we.get(1));
we.set(2,2);
console.log(we.get(2));
we.set(3,3);
console.log(we.get(3));
we.set(3,4);
console.log(we.get());