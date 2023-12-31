/**
 * @author firebird1998
 */

'use strict';

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/**
 * Adding event Listener to multiple elements
 * @param {NodeList} elements Elements node array
 * @param {string} eventType Even Type e.g.: "click", "mouseover"
 * @param {Function} callback Callback function
 */

const addEventOnElements = function (elements, eventType, callback) {
    for(const element of elements) {
        element.addEventListener(eventType, callback);
    }
}

/*Here's a breakdown of the above code:

const addEventOnElements = function (elements, eventType, callback) {: This line defines a function named addEventOnElements using the const keyword. The function takes three parameters:

elements: An array of HTML elements to which the event listener will be attached.
eventType: A string representing the type of event you want to listen for (e.g., 'click', 'mouseenter', 'keydown', etc.).
callback: A function that will be executed when the specified event occurs on the elements.
for (const element of elements) {: This starts a for...of loop that iterates through each element in the elements array. In each iteration, the current element is assigned to the variable element.

element.addEventListener(eventType, callback);: Inside the loop, this line adds an event listener to the element. The addEventListener method is used to attach an event handler function to the specified event type (eventType). When the specified event occurs on the element, the provided callback function will be executed.

In summary, the purpose of this code is to create a reusable function that simplifies the process of adding event listeners to a group of HTML elements. This can be useful when you want the same behavior to be applied to multiple elements, like attaching a click event to several buttons to trigger a common action. Here's an example of how you might use this function:

javascript

const buttons = document.querySelectorAll('.button'); // Assume there are multiple elements with the class 'button'
const handleClick = function () {
    console.log('Button clicked!');
};
addEventOnElements(buttons, 'click', handleClick);
In this example, the handleClick function will be executed whenever any of the buttons with the class 'button' is clicked. */


/**
 * Toggle search in mobile devices 
 */

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");

addEventOnElements(searchTogglers, "click", toggleSearch);

/**
 * SEARCH INTEGRATION
 */

const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", () => {

    searchTimeout ?? clearTimeout(searchTimeout);

    if(!searchField.value) {
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
    } else {
        searchField.classList.add("searching");
    }

    if(searchField.value) {
        searchTimeout = setTimeout(() => {
            fetchData(url.geo(searchField.value), function (locations) {
                searchField.classList.remove("searching");
                searchResult.classList.add("active");
                searchResult.innerHTML = `
                    <ul class="view-list" data-search-list></ul>
                `;
                const /** {Nodelist} | [] */ items = [];

                for(const { name, lat, lon, country, state } of locations) {
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("view-item");
                    searchItem.innerHTML = `
                        <!-- Location icon -->
                        <span class="m-icon">location_on</span>
                
                        <!-- Location information -->
                        <div>
                            <p class="item-title">${name}</p>
                            <p class="label-2 item-subtitle">${state || ""}, ${country}</p>
                        </div>
                        <!-- Link to toggle search -->
                        <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggle></a>

                    `;
                    searchResult.querySelector("[data-search-list]").appendChild(searchItem);
                    items.push(searchItem.querySelector("[data-search-toggle]"));
                }

                addEventOnElements(items, "click", function () {
                    toggleSearch();
                    searchResult.classList.remove("active");
                })

            });
        }, searchTimeoutDuration);
    }
});

/** Code explanation ^
 This code is an event listener in JavaScript that responds to changes in an input field, likely associated with a search functionality. Let's break down the code step by step to understand its functionality:

1. `searchField.addEventListener("input", () => { ... });`:
   This line adds an event listener to an input field with the `"input"` event. It means that whenever the user types or changes the content of the input field, the provided callback function will be executed.

2. `searchTimeout ?? clearTimeout(searchTimeout);`:
   This line checks if `searchTimeout` is already defined and clears the timeout associated with it if it exists. This is done to prevent previous search requests from firing if the user is still typing, effectively canceling the previous request.

3. `if (!searchField.value) { ... } else { ... }`:
   This `if` condition checks whether the input field's value is empty or not. If it's empty, it performs certain actions to reset the search results and visual styles associated with searching. If the input field is not empty, it sets up for fetching search results.

   - `searchResult.classList.remove("active")`, `searchResult.innerHTML = ""`, `searchField.classList.remove("searching")`:
     These lines remove the "active" class from the `searchResult` element, clear its inner HTML content, and remove the "searching" class from the `searchField`. These actions hide any existing search results and reset the styling associated with the search process.

   - `searchField.classList.add("searching")`:
     This adds the "searching" class to the `searchField`, presumably to display a loading/spinner animation to indicate that a search is in progress.

4. `if (searchField.value) { ... }`:
   This condition checks if the input field has a non-empty value, indicating that the user has entered some text to search.

   Inside this block:

   - `searchTimeout = setTimeout(() => { ... }, searchTimeoutDuration);`:
     It sets a timeout using the `setTimeout` function. This timeout ensures that the code inside the callback function is executed after a certain delay (defined by `searchTimeoutDuration`). This delay allows for a small pause after the user stops typing before actually initiating the search.

   - The callback function inside the `setTimeout`:
     This function initiates the search by fetching data from a URL generated using `url.geo(searchField.value)`. It seems that the `fetchData` function is used to perform the data retrieval.

     Once the data is retrieved successfully, it constructs a list of search result items based on the locations obtained from the fetched data. Each item includes the location's name, latitude, longitude, country, and state. Additionally, each item has a link that can be used to toggle a search action, possibly redirecting the user to a weather page with the corresponding latitude and longitude.

Overall, this code handles the user's input in a search field, triggers a search request with a delay to prevent excessive API requests while the user is typing quickly, and updates the search results and UI accordingly.
 */


// MAIN tag JS

const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
const errorContent = document.querySelector("[data-error-content]");


/**
 * Render all weather data in html page
 * 
 * @param {number} lat 
 * @param {number} lon 
 */

export const updateWeather = function (lat, lon) {
    loading.style.display = "grid";
    container.style.overflow = "hidden";
    container.classList.remove("fade-in");
    errorContent.style.display = "none";

    const currentweatherSection = document.querySelector("[data-current-weather]");
    const highlightsSection = document.querySelector("[data-highlights]");
    const hourlySection = document.querySelector("[data-hourly-forecast]");
    const forecastSection = document.querySelector("[data-5-day-forecast]");

    currentweatherSection.innerHTML = "";
    highlightsSection.innerHTML = "";
    hourlySection.innerHTML = "";
    forecastSection.innerHTML = "";

    if (window.location.hash === "#/current-location") {
        currentLocationBtn.setAttribute("disabled", "");
    } else {
        currentLocationBtn.removeAttribute("disabled");
    }

    /**
     * CURRENT WEATHER SECTION
     */

    fetchData(url.currentWeather(lat, lon), function (currentWeather) {
        const {
            weather, 
            dt: dateUnix,
            sys: {sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
            main: { temp, feels_like, humidity, pressure },
            visibility,
            timezone
        } = currentWeather
        const[{description, icon}] = weather;

        const card = document.createElement("div");
        card.classList.add("card", "card-lg", "current-weather-card");

        card.innerHTML = `
            <h2 class="title-2 card-title">Now</h2>
            
            <div class="weapper">
            
                <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>
                <img src="public/images/weather_icons/${icon}.png" alt="${description}" width="64" height="64" class="weather-icon">
            </div>

            <p class="body-3">${description}</p>

            <ul class="meta-list">
                <li class="meta-item">
                  <span class="m-icon">calendar_today</span>
                  <p class="title-3 meta-text">${module.getDate(dateUnix, timezone)}</p>
                </li>
                <li class="meta-item">
                  <span class="m-icon">location_on</span>
                  <p class="title-3 meta-text" data-location></p>
                </li>
            </ul>
        `;

        fetchData(url.reverseGeo(lat, lon), function([{ name, country}]){
            card.querySelector("[data-location]").innerHTML = `${name}, ${country}`
        });

        currentweatherSection.appendChild(card);

        /**
         * TODAY'S HIGHLIGHTS SECTION
         */

        fetchData(url.airPollution(lat, lon), function (airPollution){ 
            const[{
                main: {aqi},
                components: { no2, o3, so2, pm2_5 }
            }] = airPollution.list;

            const card = document.createElement("div");
            card.classList.add("card", "card-lg");

            card.innerHTML = `
            <h2 class="title-2" id="highlights-label">Todays Highlights</h2>

            <div class="highlight-list">

              <div class="card card-sm highlight-card one">

                <h3 class="title-3">Air Quality Index</h3>

                <div class="wrapper">

                  <span class="m-icon">air</span>

                  <ul class="card-list">

                    <li class="card-item">
                      <p class="title-1">${pm2_5.toPrecision(3)}</p>
                      <p class="label-1">PM<sub>2.5</sub></p>
                    </li>

                    <li class="card-item">
                      <p class="title-1">${so2.toPrecision(3)}</p>
                      <p class="label-1">SO<sub>2</sub></p>
                    </li>
                    
                    <li class="card-item">
                      <p class="title-1">${no2.toPrecision(3)}</p>
                      <p class="label-1">NO<sub>2</sub></p>
                    </li>

                    <li class="card-item">
                      <p class="title-1">${o3.toPrecision(3)}</p>
                      <p class="label-1">O<sub>3</sub></p>
                    </li>

                  </ul>

                </div>

                <span class="badge aqi-${aqi} label-${aqi}" title="${module.aqiText[aqi].message}">
                  ${module.aqiText[aqi].level}
                </span>

              </div>

              <div class="card card-sm highlight-card two">
                <h3 class="title-3">Sunrise & Sunset</h3>

                <div class="card-list">
                  <div class="card-item">
                    <span class="m-icon">clear_day</span>

                    <div>
                      <p class="lable-1">Sunrise</p>
                      <p class="title-1">${module.getTime(sunriseUnixUTC, timezone)}</p>
                    </div>
                  </div> 

                  <div class="card-item">
                    <span class="m-icon">clear_night</span>

                    <div>
                      <p class="lable-1">Sunset</p>
                      <p class="title-1">${module.getTime(sunsetUnixUTC, timezone)}</p>
                    </div>
                  </div>

                </div>
              </div>

              <div class="card card-sm highlight-card">
                
                <h3 class="title-3">Humidity</h3>
                <div class="wrapper">
                  <span class="m-icon">humidity_percentage</span>
                  <p class="title-1">${humidity}<sub>%</sub></p>                 
                </div>

              </div>

              <div class="card card-sm highlight-card">
                
                <h3 class="title-3">Pressure</h3>
                <div class="wrapper">
                  <span class="m-icon">airware</span>
                  <p class="title-1">${pressure}<sub>hPa</sub></p>                 
                </div>
                
              </div>

              <div class="card card-sm highlight-card">
                
                <h3 class="title-3">Visibility</h3>
                <div class="wrapper">
                  <span class="m-icon">visibility</span>
                  <p class="title-1">${visibility / 1000}<sub>km</sub></p>                 
                </div>
                
              </div>

              <div class="card card-sm highlight-card">
                
                <h3 class="title-3">Feels Like</h3>
                <div class="wrapper">
                  <span class="m-icon">thermostat</span>
                  <p class="title-1">${parseInt(feels_like)}&deg;<sub>C</sub></p>                 
                </div>
                
              </div>
            </div>
            `;

            highlightsSection.appendChild(card);



        });

        /**
         * 24Hours Forcust Section
         */

        fetchData(url.forecast(lat, lon), function (forecast){
            const {
                list: forecastList,
                city: { timezone }
            } = forecast;

            hourlySection.innerHTML = `
                <h2 class="title-2">Today at</h2>
                <div class="slider-container">
                    <ul class="slider-list" data-temp></ul>

                    <ul class="slider-list" data-wind></ul>

                </div>
            `;

            for(const [index, data] of forecastList.entries()){
                if(index > 7) break;

                const { 
                    dt : dataTimeUnix,
                    main: { temp },
                    weather,
                    wind: { deg: windDirection, speed: windSpeed }
                } = data;
                const[{icon, description}] = weather;

                const tempLi = document.createElement('li');
                tempLi.classList.add('slider-item');

                tempLi.innerHTML = `
                <div class="card card-sm slider-card">
                    <p class="body-3">${module.getHours(dataTimeUnix, timezone)}</p>

                    <img src="public/images/weather_icons/${icon}.png" alt="${description}" class="weather-icon" width="48" height="48" loading="lazy" title="${description}">

                    <p class="body-3">${parseInt(temp)}&deg;<sub>C</sub></p>
                </div>
                `;

                hourlySection.querySelector('[data-temp]').appendChild(tempLi);

                const windLi = document.createElement('li');
                windLi.classList.add('slider-item');

                windLi.innerHTML = `
                <div class="card card-sm slider-card">
                    <p class="body-3">${module.getHours(dataTimeUnix, timezone)}</p>

                    <img src="public/images/weather_icons/direction.png" alt="" class="weather-icon" width="48" height="48" loading="lazy" style="transform: rotate(${windDirection - 180}deg)">

                    <p class="body-3">${parseInt(module.mps_to_kmh(windSpeed))} km/h</p>

                </div>
                `;
                hourlySection.querySelector('[data-wind]').appendChild(windLi);
            }

            /**
             * 5Days ForeCast Section
             */

            forecastSection.innerHTML= `
                <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>
            
                <div class="card card-lg forecast-card">
                    <ul data-forecast-list></ul>
                </div>
            `;

            for(let i = 7, len = forecastList.length; i < len; i += 8 ){
                const{
                    main: { temp_max },
                    weather, 
                    dt_txt

                } = forecastList[i];

                const[{icon, description}] = weather;

                const date = new Date(dt_txt);

                const li = document.createElement('li');
                li.classList.add('card-item');

                li.innerHTML = `
                <div class="icon-wrapper">
                    <img src="public/images/weather_icons/${icon}.png" width="36" height="36" alt="${description}" class="weather-icon">
                    <span class="span">
                        <p class="title-2">${parseInt(temp_max)}&deg;<sub>C</sub></p>
                    </span>
                </div>

                <p class="label-1">${date.getDate()} ${module.monthNames[date.getMonth()]}</p>


                <p class="label-1">${module.weekDayNames[date.getUTCDay()]}</p>
                `;

                forecastSection.querySelector("[data-forecast-list]").appendChild(li);

            }

            loading.style.display = "none";
            container.style.overflow = "overlay";
            container.classList.add("fade-in");

        });


    });


}


export const error404 = () => errorContent.style.display = "flex";


