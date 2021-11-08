'use strict'

let cache = require('./cache.js');
const axios = require('axios');
const { response } = require('express');

class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.poster_path = obj.poster_path;
        this.release_date = obj.release_date;
    }
}

 function getMovie (city) {

    const key = 'movie-' + city;
    // const query  = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000*60*60*24)) {
        console.log('Cache hit');
      } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
        .then(response => parseMovie(response));
      }
      return cache[key].data;
}

function parseMovie(movieData) {
    try {
    // const movieSum = await axios.get(url)
    // console.log(results.data);
    const movieSum = movieData.data.results.map(movie => {
        return new Movie(movie);
    });
    return Promise.resolve(movieSum);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = getMovie;