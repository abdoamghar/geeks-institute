const chalk = require("chalk");

function displayColorfulMessage() {
  const message = chalk.green.bold("Node.js modules make coding colorful!");
  console.log(message);
  return message;
}

module.exports = displayColorfulMessage;