import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lon: null,
  citySelected: "",
  countrySelected: "",
  searchHistory: JSON.parse(localStorage.getItem("history"))
    ? [...JSON.parse(localStorage.getItem("history"))]
    : [],
  showSearches: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addSearchHistory: (state, action) => {
      const { lat, lon, city, country } = action.payload;
      state.lat = lat;
      state.lon = lon;
      state.citySelected = city;
      state.countrySelected = country;
      state.searchHistory.push({
        lat,
        lon,
        city,
        country,
        time: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });
      state.showSearches = false;
      localStorage.setItem("history", JSON.stringify(state.searchHistory));
    },
    removeSearchHistory: (state, action) => {
      const { index } = action.payload;
      state.searchHistory.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(state.searchHistory));
    },
    setShowSearches: (state, action) => {
      state.showSearches = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSearchHistory, removeSearchHistory, setShowSearches } =
  locationSlice.actions;

export default locationSlice.reducer;
