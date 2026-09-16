const readline = require("readline");
const getWeather = require("./weather");

function startDashboard() {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  interface.question("Enter a city name: ", async (city) => {
    try {
      await getWeather(city.trim());
    } catch (error) {
      console.error(`Unable to get weather: ${error.message}`);
      process.exitCode = 1;
    } finally {
      interface.close();
    }
  });
}

module.exports = startDashboard;