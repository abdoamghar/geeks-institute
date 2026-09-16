function isValidFullName(fullName) {
  return /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(fullName);
}

function checkFullName(fullName) {
  const valid = isValidFullName(fullName);
  console.log(valid ? "Valid full name" : "Invalid full name");
  return valid;
}

const fullName = process.argv.slice(2).join(" ");

if (fullName) {
  checkFullName(fullName);
} else {
  console.log("Usage: node app.js \"John Doe\"");
}

module.exports = { isValidFullName, checkFullName };