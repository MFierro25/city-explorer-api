'use strict'

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const weather = require('./data/weather.json')
const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());

app.get('/weather', handleGetWeather);

function handleGetWeather(req, res) {

    const cityName = req.query.city;
    const lat = req.query.lat;
    const lon = req.query.lon;

    try {
        const cityToSend = weather.find(city =>  {
            if((city.lat === lat && city.lon === lon) || city.city_name === cityName) {
                return true
            } return false;
        });
        if (cityToSend) {
            const forecastData = cityToSend.data.map(city => new WeatherForecast(city));

            res.status(200).send(forecastData)
        } else {
            res.status(404).send('city not found');
        }
    } catch (e) {
        res.status(500).send('Server error');
    }
}

class WeatherForecast {
    constructor(obj) {
        this.min_temp = obj.min_temp
        this.max_temp = obj.max_temp
        this.description = obj.weather.description
    }
}

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
