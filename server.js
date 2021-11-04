'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (req, res) => res.status(200).send('Hello'));
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// function getForecastData(city) {
//     return city.data.map((day) => {
//         const date = day.datetime;
//         const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
//         return new WeatherForecast(description, date);
//     })
// }

class WeatherForecast {
    constructor(obj) {
        this.description = obj.weather.description;
        this.date = obj.datetime;
    }
}

async function handleGetWeather (req, res) {

    const { lat, lon } = req.query;
    // const lat = req.query.lat;
    // const lon = req.query.lon;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    
        const results = await axios.get(url)
        const forecastData = results.data.data.map(forecast => new WeatherForecast(forecast))
           res.status(200).send(forecastData);

}

class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
    }
}

async function handleGetMovies (req, res) {

    const query  = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;

    const results = await axios.get(url)
    console.log(results.data);
    const movieData = results.data.results.map(movie => new Movie(movie))
        res.status(200).send(movieData);
}

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
