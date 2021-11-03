'use strict'

require('dotenv').config();

const express = require('express');

const cors = require('cors');
const { response } = require('express');

const weatherInfo = require('./data/weather.json')
const app = express();
const PORT = process.env.PORT

app.use(cors());

app.get('/weather', weatherInfo);

app.listen(PORT, () => console.log('server is up on '));
