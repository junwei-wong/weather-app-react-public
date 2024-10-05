import { useDispatch } from "react-redux";
import { addSearchHistory } from "../../../services/locationSlice";
import PropTypes from "prop-types";
import "./citySelection.css";

const CitySelection = ({ cities = [], triggerWeatherCall }) => {
  const dispatch = useDispatch();
  return cities.length > 0 ? (
    cities.map((city, index) => {
      return (
        <div
          className="city-selection"
          key={city.cityName + city.cityCountry + index}
          onClick={() => {
            const {
              cityName,
              cityCountry,
              cityCoordinates: { lat, lon },
            } = city;
            dispatch(
              addSearchHistory({
                city: cityName,
                country: cityCountry,
                lat,
                lon,
              })
            );
            triggerWeatherCall(
              {
                lat: city.cityCoordinates.lat,
                lon: city.cityCoordinates.lon,
              },
              true
            );
          }}
        >
          <p>
            {city.cityName}, {city.cityCountry}
          </p>
        </div>
      );
    })
  ) : (
    <div>Not found</div>
  );
};

CitySelection.propTypes = {
  cities: PropTypes.array,
  triggerWeatherCall: PropTypes.func.isRequired,
};

export default CitySelection;
