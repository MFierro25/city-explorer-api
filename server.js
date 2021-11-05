'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const handleGetMovies = require('./movies.js');
const handleGetWeather = require('./weather.js');

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (req, res) => res.status(200).send('Hello'));
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);


app.listen(PORT, () => console.log(`server is up on ${PORT}`));
