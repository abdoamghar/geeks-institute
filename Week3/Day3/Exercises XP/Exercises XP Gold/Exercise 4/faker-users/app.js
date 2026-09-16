const readline = require("readline");
const { users, addUser } = require("./users");

function promptForUser() {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  interface.question("Name: ", (name) => {
    interface.question("Address street: ", (addressStreet) => {
      interface.question("Country: ", (country) => {
        addUser(name, addressStreet, country);
        console.log(users);
        interface.close();
      });
    });
  });
}

addUser();
addUser();
addUser();
console.log(users);

if (process.argv.includes("--prompt")) {
  promptForUser();
}