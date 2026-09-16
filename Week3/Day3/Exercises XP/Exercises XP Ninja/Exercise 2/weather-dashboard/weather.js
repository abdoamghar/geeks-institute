const axios = require("axios");
const chalk = require("chalk");

const weatherDescriptions = {
  0: "clear sky",
  1: "mainly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "foggy",
  48: "depositing rime fog",
  51: "light drizzle",
  53: "moderate drizzle",
  55: "dense drizzle",
  61: "slight rain",
  63: "moderate rain",
  65: "heavy rain",
  71: "slight snow",
  73: "moderate snow",
  75: "heavy snow",
  80: "slight rain showers",
  81: "moderate rain showers",
  82: "violent rain showers",
  95: "thunderstorm",
};

async function getWeather(city) {
  const locations = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: { name: city, count: 1, language: "en", format: "json" },
  });

  const location = locations.data.results?.[0];
  if (!location) {
    throw new Error(`Could not find a city named "${city}".`);
  }

  const forecast = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
      temperature_unit: "celsius",
      wind_speed_unit: "kmh",
    },
  });

  const current = forecast.data.current;
  const description = weatherDescriptions[current.weather_code] || "unknown conditions";
  console.log(chalk.blue.bold(`\nWeather for ${location.name}, ${location.country}`));
  console.log(chalk.yellow(`Temperature: ${current.temperature_2m} C`));
  console.log(`Conditions: ${description}`);
  console.log(`Humidity: ${current.relative_humidity_2m}%`);
  console.log(`Wind: ${current.wind_speed_10m} km/h`);

  return { location, current, description };
}

module.exports = getWeather;