'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001


app.get('/weather', handleGetWeather);

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

function getForecastData(city) {
    return city.data.map((day) => {
        const date = day.datetime;
        const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
        return new WeatherForecast(description, date);
    })
}

class WeatherForecast {
    constructor(obj) {
        this.descripton = obj.description
        this.date = obj.date
    }
}

async function handleGetWeather (req, res) {

    const lat = req.query.lat;
    const lon = req.query.lon;

    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`;
    
        const weatherResults = await axios.get(url)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                    throw new Error('Invalid search');
                }
            });

    if (weatherResults) {
        const forecastData = getForecastData(weatherResults);
        res.send(forecastData);
    } else {
        throw new Error ('Invalid'); 
}
};
        
app.listen(PORT, () => console.log(`server is up on ${PORT}`));
