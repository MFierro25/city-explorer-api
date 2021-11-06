'use strict'

const axios = require('axios');

class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.poster_path = obj.poster_path;
        this.release_date = obj.release_date;
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

module.exports = handleGetMovies;