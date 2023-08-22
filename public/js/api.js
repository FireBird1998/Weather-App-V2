// @ Creator firebird1998

'use strict';

const api_key = "7c0dc075d46cb8bd3f95bcab09783971";

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

/**
   * 
   * This is a JavaScript code snippet that defines a function named fetchData. The function takes two arguments: URL and callback. The function uses the fetch method to make an HTTP request to the specified URL, with the api_key appended as a query parameter. The response is then converted to a JSON object using the .json() method. Once the data is received, the callback function is called with the data as its argument.
   * 
   * The purpose of this function is to fetch data from a specified URL and pass it to a callback function for further processing. It’s a common pattern in JavaScript to use callback functions to handle asynchronous operations such as fetching data from an API. This allows the code to continue executing while waiting for the data to be fetched, and then process the data once it’s available.
*/

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

  /**
   * 
   * @param {string} query Search query eg.: "Kolkata" , "Delhi"
   * @returns 
   */
  geo(query) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  }
}

/**This code exports a constant object named url that contains several methods for generating URLs for the OpenWeatherMap API. The methods are as follows:
  
 
  
 * currentWeather(lat, lon): This method takes in the latitude and longitude of a location and returns the URL for the current weather data of that location in metric units.
 * 
 * forecast(lat, lon): This method takes in the latitude and longitude of a location and returns the URL for the 5-day forecast data of that location in metric units.
 * 
 * airPollution(lat, lon): This method takes in the latitude and longitude of a location and returns the URL for the air pollution data of that location.
 * 
 * reverseGeo(lat, lon): This method takes in the latitude and longitude of a location and returns the URL for reverse geocoding that location. It returns up to 5 results.
 * 
 * geo(query): This method takes in a search query string (e.g., “Kolkata”, “Delhi”) and returns the URL for direct geocoding that query. It returns up to 5 results.


Each of these methods generates a URL by inserting the provided parameters into a template string. The URLs are for different endpoints of the OpenWeatherMap API, which can be used to retrieve weather, air pollution, and geocoding data.
 */

