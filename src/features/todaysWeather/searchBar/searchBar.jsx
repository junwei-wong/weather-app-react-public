import { useState } from "react";
import { useDispatch } from "react-redux";
import { setShowSearches } from "../../../services/locationSlice";
import countryList from "./country.json";
import PropTypes from "prop-types";
import "./searchBar.css";
import { DeleteIconBig, SearchIconBig } from "../../../assets/images/icons";

const SearchBar = ({ triggerLocationCall }) => {
  const dispatch = useDispatch();
  const [cityInput, setCitynput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  return (
    <div className="search-bar">
      <div className="city-fields">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          onChange={(event) => setCitynput(event.currentTarget.value)}
          autoComplete="true"
          value={cityInput}
        />
      </div>
      <div className="country-fields">
        <label htmlFor="country">Country: </label>
        <select
          name="country"
          id="country"
          onChange={(event) => setCountryInput(event.target.value)}
          disabled={cityInput === ""}
          value={cityInput === "" ? "" : countryInput}
        >
          <option value=""></option>
          {countryList.map((country) => (
            <option key={country["alpha-2"]} value={country["alpha-2"]}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          triggerLocationCall({ city: cityInput, country: countryInput }, true);
          dispatch(setShowSearches(true));
        }}
        disabled={cityInput === ""}
        className="search-btn"
      >
        <SearchIconBig />
      </button>
      <button
        onClick={() => {
          setCitynput("");
          setCountryInput("");
        }}
        className="delete-btn"
      >
        <DeleteIconBig />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  triggerLocationCall: PropTypes.func.isRequired,
};

export default SearchBar;
