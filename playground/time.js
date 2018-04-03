const moment = require('moment');

let date = moment();

let someTimestamp = moment().valueOf();

console.log(someTimestamp);

console.log(date.format('h:mm a'));