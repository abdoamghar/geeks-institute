function returnNumbers(value) {
  return value.match(/\d/g)?.join("") || "";
}

const input = process.argv[2] || "k5k3q2g5z6x9bn";
console.log(returnNumbers(input));

module.exports = returnNumbers;