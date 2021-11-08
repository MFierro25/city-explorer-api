'use strict'

let cache = require('./cache.js');
const axios = require('axios');
const { response } = require('express');

class Weather {
    constructor(obj) {
        this.description = obj.weather.description;
        this.date = obj.datetime;
    }
}

function getWeather (lat, lon) {

    const key = 'weather-' + lat + lon;
    // const { lat, lon } = req.query;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=5&key=${process.env.WEATHER_API_KEY}`;
    
    if (cache[key] && (Date.now() - cache[key].timestamp < 1000*60*60)) {
        console.log('Cache hit');
      } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
        .then(response => parseWeather(response));
      }
    
      return cache[key].data;
    } 

    function parseWeather(weatherData) { 
    try {
        // const results = await axios.get(url)
        const weatherSum = weatherData.data.data.map(forecast => {
            return new Weather(forecast)
        });
           return Promise.resolve(weatherSum);
        } catch (e) {
          return Promise.reject(e);
        }
      }


module.exports = getWeather;