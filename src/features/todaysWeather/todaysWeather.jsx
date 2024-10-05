import CitySelection from "./citySelection/citySelection";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./todaysWeather.css";

const TodaysWeather = ({ triggerWeatherCall, weatherData, locationData }) => {
  const { citySelected, countrySelected, showSearches } = useSelector(
    (state) => state.location
  );
  return (
    <div id="todays-weather">
      <header>
        <h1>Today&apos;s Weather</h1>
      </header>
      {showSearches ? (
        <CitySelection
          cities={locationData}
          triggerWeatherCall={triggerWeatherCall}
        />
      ) : null}

      {!showSearches && weatherData?.weather ? (
        <div id="weather-widget">
          <p id="city-text">
            {citySelected}, {countrySelected}
          </p>
          <p id="weather-text">{weatherData?.weather}</p>
          <p id="temperature-text">
            {Math.round(Number(weatherData?.temp), 2)}&#176;
          </p>
          <p id="tempHL-text">
            H: {Math.round(Number(weatherData?.tempHigh))}&#176; L:{" "}
            {Math.round(Number(weatherData?.tempLow))}&#176;
          </p>
          <p id="humidity-text">Humidity: {weatherData?.humidity}%</p>
          <p id="time-text">{weatherData?.time}</p>
        </div>
      ) : null}
    </div>
  );
};

TodaysWeather.propTypes = {
  triggerWeatherCall: PropTypes.func.isRequired,
  weatherData: PropTypes.object,
  locationData: PropTypes.array.isRequired,
};

export default TodaysWeather;
