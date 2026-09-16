const _ = require("lodash");
const math = require("./math");

console.log(math.add(5, 3));
console.log(math.multiply(5, 3));

const numbers = [10, 20, 30, 40];

console.log(_.sum(numbers));
console.log(_.max(numbers));
console.log(_.min(numbers));