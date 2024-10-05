import { useDispatch, useSelector } from "react-redux";
import {
  addSearchHistory,
  removeSearchHistory,
} from "../../services/locationSlice";
import { DeleteLightIcon, SearchLightIcon } from "../../assets/images/icons";
import PropTypes from "prop-types";
import "./searchHistory.css";

const SearchHistory = ({ triggerWeatherCall }) => {
  const history = useSelector((state) => state.location.searchHistory);
  const dispatch = useDispatch();
  return (
    <div id="search-history">
      <header>
        <h1>Search History</h1>
      </header>
      <div className="history-rows">
        {[...history].reverse().map((h, index) => (
          <div key={h.city + index} className="history-row">
            <p id="citycountry-history-text">
              {h.city}, {h.country}
            </p>
            <p id="time-history-text">{h.time}</p>
            <button
              key={"search" + index}
              className="search-history-btn"
              onClick={() => {
                triggerWeatherCall({ lat: h.lat, lon: h.lon }, true);
                dispatch(
                  addSearchHistory({
                    city: h.city,
                    country: h.country,
                    lat: h.lat,
                    lon: h.lon,
                  })
                );
              }}
            >
              <SearchLightIcon />
            </button>
            <button
              key={"delete" + index}
              className="delete-history-btn"
              onClick={() => dispatch(removeSearchHistory({ index: index }))}
            >
              <DeleteLightIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchHistory.propTypes = {
  triggerWeatherCall: PropTypes.func.isRequired,
};

export default SearchHistory;
