const fs = require("fs");

function readFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  console.log(content);
  return content;
}

module.exports = readFile;