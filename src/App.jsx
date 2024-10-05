import TodaysWeather from "./features/todaysWeather/todaysWeather";
import SearchHistory from "./features/searchHistory/searchHistory";
import {
  useLazyGetCurrentWeatherByCoordinatesQuery,
  useLazyGetLocationByCityOrCountryQuery,
} from "./services/weather";
import SearchBar from "./features/todaysWeather/searchBar/searchBar";
import "./App.css";

function App() {
  const [triggerWeatherCall, { data: weatherData }] =
    useLazyGetCurrentWeatherByCoordinatesQuery();
  const [triggerLocationCall, { data: locationData }] =
    useLazyGetLocationByCityOrCountryQuery();
  return (
    <div className="container">
      <SearchBar triggerLocationCall={triggerLocationCall} />
      <div className="content">
        <TodaysWeather
          triggerWeatherCall={triggerWeatherCall}
          weatherData={weatherData}
          locationData={locationData}
        />
        <SearchHistory triggerWeatherCall={triggerWeatherCall} />
      </div>
    </div>
  );
}

export default App;
