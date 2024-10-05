// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formatCity, formatWeather } from "../utils/helper";

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/",
  }),
  endpoints: (builder) => ({
    getLocationByCityOrCountry: builder.query({
      query: ({ city, country }) => ({
        url: "geo/1.0/direct",
        params: {
          q: `${city}${city && country ? "," : ""}${country ? country : ""}`,
          limit: 5,
          appid: "",
        },
      }),
      transformResponse: (response) => formatCity(response),
    }),
    getCurrentWeatherByCoordinates: builder.query({
      query: ({ lat, lon }) => ({
        url: "data/2.5/weather",
        params: {
          lat,
          lon,
          units: "metric",
          appid: "693d37a0e01ee86f381b47729535954e",
        },
      }),
      transformResponse: (response) => formatWeather(response),
    }),
  }),
});

export const {
  useGetLocationByCityOrCountryQuery,
  useLazyGetLocationByCityOrCountryQuery,
  useGetCurrentWeatherByCoordinatesQuery,
  useLazyGetCurrentWeatherByCoordinatesQuery,
} = weatherApi;
