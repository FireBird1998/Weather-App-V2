/**
 * @author firebird1998
 */

'use strict';

/**
    Imports and Constants: 
    The code imports two functions, updateWeather and error404, from the ./api.js module. It also defines a constant defaultLocation which specifies    the default location to use if the user’s current location cannot be determined.
 */

import {updateWeather, error404} from './main.js';
const defaultLocation = "#/weather?lat=23.7644025&lon=90.389015";


/*
    The currentLocation function uses the window.navigator.geolocation.getCurrentPosition method to get the user’s current location. If successful, it calls the updateWeather function with the latitude and longitude of the user’s location. If an error occurs, it sets the window location hash to the default location.
 */

const currentLocation =  function () {
    window.navigator.geolocation.getCurrentPosition(function (position) {
        const {latitude, longitude} = position.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);

    }, err => {
        window.location.hash = defaultLocation;
    });

}


/*
    The searchedLocation function takes a query string as an argument and calls the updateWeather function with the query split by “&”.
*/ 

/**
 * 
 * @param {string} query Search query string     
 */

const searchedLocation = query => {
    updateWeather(...query.split("&"))
    // console.log(query.split("&"))
};

//updating updateWeather(lat, lon)



/*
    The code defines a routers Map that maps route paths to functions. The /current-location route is mapped to the currentLocation function, and the /weather route is mapped to the searchedLocation function.
 */

const routers = new Map([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation],
]);



/*
    The checkHash function is called when the window hash changes or when the page loads. It gets the request URL from the window hash, splits it into a router and query, and calls the appropriate function from the routers Map with the query as an argument. If no matching router is found, it calls the error404 function.

    The code adds event listeners for the hashchange and load events on the window object. When the page loads, if there is no hash set, it sets it to #/current-location. Otherwise, it calls the checkHash function.
 */

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [router, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routers.get(router) ? routers.get(router)(query) : error404();
}

window.addEventListener('hashchange', checkHash);

window.addEventListener('load', function () {
    if(!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
});


