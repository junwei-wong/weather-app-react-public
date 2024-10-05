const formatCity = (cities) => {
  const formattedCities = cities.map((city) => {
    return {
      cityName: city.name,
      cityCountry: city.country,
      cityCoordinates: { lat: city.lat, lon: city.lon },
    };
  });
  return formattedCities;
};

const formatWeather = (cityWeather) => {
  const formattedWeather = {
    weather: cityWeather.weather[0].main,
    description: cityWeather.weather[0].description,
    temp: cityWeather.main.temp,
    tempHigh: cityWeather.main.temp_max,
    tempLow: cityWeather.main.temp_min,
    humidity: cityWeather.main.humidity,
    time: calculateTimezone(cityWeather.timezone, cityWeather.dt),
  };
  return formattedWeather;
};

const calculateTimezone = (timezone, dt) => {
  // Convert the dt value to a Date object
  const utcTime = new Date(dt * 1000);

  // Create a new Date object with the timezone offset applied
  const timezoneTime = new Date(utcTime.getTime() + timezone * 1000);

  // Format the time as desired
  const formattedTime = timezoneTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
};

export { formatCity, formatWeather };
