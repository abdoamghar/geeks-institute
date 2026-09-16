const axios = require("axios");

async function fetchData() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
  console.log(JSON.stringify(response.data, null, 2));
  return response.data;
}

module.exports = fetchData;