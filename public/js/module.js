/**
 * This file is Created by firebird1998
 */

'use strict';

export const weekDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

/**
 * 
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Timezone in seconds
 * @returns {string} Date String in the format of "Monday, 2nd Jan"
 */

export const getDate = function (dateUnix, timezone) {
    const date = new Date((dateUnix + timezone) * 1000);
    const weekDayName = weekDayNames[date.getUTCDay()];
    const monthName = monthNames[date.getUTCMonth()];

    return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
}

/**
 * 
 * @param {number} timeUnix Unix time in seconds
 * @param {number} timezone TimeZone in seconds
 * @returns {string} Time String in the format of "12:00 PM"
 */
    
export const getTime = function (timeUnix, timezone) {
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12}:${minutes} ${period}`;
}

/**
 * 
 * @param {number} timeUnix Unix time in seconds
 * @param {number} timezone TimeZone in seconds
 * @returns {string} Hours String in the format of "12 PM"
 */

export const getHours = function (timeUnix, timezone) {
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getUTCHours();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12} ${period}`;
}

/**
 * 
 * @param {numbar} mps Metter per second
 * @returns {number} Kilometer per hour
 */

export const mps_to_kmh = function (mps) {
    const mph = mps * 3600;
    return mph / 1000;
}


export const aqiText = {
    1: {
        level: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses little or no risk.",
    },

    2: {
        level: "Fair",
        message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
    },

    3: {
        level: "Moderate",  
        message: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",    
    },

    4: {
        level: "Poor",  
        message: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
    },

    5: {
        level: "Very Poor",
        message: "Health alert: everyone may experience more serious health effects.",
    },
}

/**
 This code exports a constant object named aqiText that contains several properties, each of which is an object representing a different level of air quality. The properties are indexed by numbers from 1 to 5, with 1 representing the best air quality and 5 representing the worst. Each of these objects has two properties: level and message.

    level: This property contains a string that describes the level of air quality. The levels, in order from best to worst, are “Good”, “Fair”, “Moderate”, “Poor”, and “Very Poor”.
    message: This property contains a string that provides more information about the air quality level and its potential health effects.
    This object can be used to display user-friendly information about air quality based on an air quality index (AQI) value. For example, if the AQI value is 1, the corresponding level would be “Good” and the message would be “Air quality is considered satisfactory, and air pollution poses little or no risk.”
 */