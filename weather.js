'use strict'

const axios = require('axios');

class WeatherForecast {
    constructor(obj) {
        this.description = obj.weather.description;
        this.date = obj.datetime;
    }
}

async function handleGetWeather (req, res) {

    const { lat, lon } = req.query;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    
        const results = await axios.get(url)
        const forecastData = results.data.data.map(forecast => new WeatherForecast(forecast))
           res.status(200).send(forecastData);

}

module.exports = handleGetWeather;