
# Utility Functions for Weather App

This module provides various utility functions for formatting and converting data related to time, date, and air quality. Let's go through each function and its purpose.

## `weekDayNames` and `monthNames` Constants

These constants define arrays containing the names of weekdays and months. These arrays are used for mapping numeric values to their corresponding textual representations.

## `getDate` Function

```javascript
/**
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Timezone in seconds
 * @returns {string} Date String in the format of "Monday, 2nd Jan"
 */
```

This function takes a Unix timestamp (`dateUnix`) and a timezone offset (`timezone`) as parameters. It converts the Unix timestamp to a human-readable date string in the format "Monday, 2nd Jan" based on the provided timezone.

## `getTime` Function

```javascript
/**
 * @param {number} timeUnix Unix time in seconds
 * @param {number} timezone TimeZone in seconds
 * @returns {string} Time String in the format of "12:00 PM"
 */
```

This function is similar to `getDate`, but it converts a Unix timestamp to a human-readable time string in the format "12:00 PM" based on the provided timezone.

## `getHours` Function

```javascript
/**
 * @param {number} timeUnix Unix time in seconds
 * @param {number} timezone TimeZone in seconds
 * @returns {string} Hours String in the format of "12 PM"
 */
```

This function, again, converts a Unix timestamp to a human-readable hours string in the format "12 PM" based on the provided timezone.

## `mps_to_kmh` Function

```javascript
/**
 * @param {number} mps Meters per second
 * @returns {number} Kilometers per hour
 */
```

This function converts a value from meters per second (`mps`) to kilometers per hour.

## `aqiText` Object

This object provides user-friendly descriptions for different levels of air quality based on the Air Quality Index (AQI). It has properties indexed from 1 to 5, with each property representing a different AQI level. Each AQI level object has two properties:

- `level`: A string describing the level of air quality, ranging from "Good" to "Very Poor".
- `message`: A string providing additional information about the air quality level and its potential health effects.

This object can be used to display understandable information about air quality levels corresponding to AQI values.

In conclusion, this module provides essential functions and data for formatting time and date, converting units, and explaining air quality levels. These utilities are crucial for enhancing the user experience of the weather app's information presentation.