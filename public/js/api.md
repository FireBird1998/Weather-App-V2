
## Code Overview

This JavaScript code snippet defines functions to interact with the OpenWeatherMap API for fetching weather data, forecasts, air pollution data, and performing geocoding operations.

## fetchData Function

```javascript
/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {Function} callback callback
 */
export const fetchData = function (URL, callback) {
    fetch(`${URL}&appid=${api_key}`)
      .then(res => res.json())
      .then(data => callback(data));
}
```

The `fetchData` function is used to fetch data from a given API URL and pass the result to a callback function. It makes use of the `fetch` API to perform an HTTP GET request and expects the API key as part of the query string. The response is parsed as JSON, and the resulting data is passed to the provided callback function.

## URL Generation Methods

```javascript
export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
    },
    airPollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
    },
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
    },
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
    }
}
```

The `url` object contains methods to generate URLs for various OpenWeatherMap API endpoints. Each method takes specific parameters (such as latitude and longitude) or a query string and returns a fully formed URL for the corresponding API endpoint. These URLs can be used to fetch weather, forecast, air pollution, and geocoding data from the OpenWeatherMap API.

---

**Note:** This code is designed to interact with the OpenWeatherMap API. To use it, you need to provide your own API key for authentication.
