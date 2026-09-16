const faker = require("faker");

const users = [];

function addUser(name = faker.name.findName(), addressStreet = faker.address.streetAddress(), country = faker.address.country()) {
  const user = {
    name,
    addressStreet,
    country,
  };

  users.push(user);
  return user;
}

module.exports = { users, addUser };