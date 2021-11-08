'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const movie = require('./modules/movies.js');
const weather = require('./modules/weather.js');

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (req, res) => res.status(200).send('Hello'));
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);
app.get('/*', handleError);

function weatherHandler(request, response) {
    const { lat, lon } = request.query;
    weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
  }
  
  function movieHandler(request, response) {
      const { city } = request.query;
      movie(city)
      .then(summaries => response.send(summaries))
      .catch((error) => {
        console.error(error);
        response.status(200).send('Sorry. Something went wrong!')
      });
    }
  

function handleError(request, response) {
    response.status(404).send('Not found.');
}

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
