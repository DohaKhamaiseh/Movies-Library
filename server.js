'use strict';

// import express and cors
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
let APIKey = process.env.APIKey;
// import data.json
const Data = require('./Movie_Data/data.json');
//console.log(Data);

const PORT = 4000;

const server = express();


// to make server open for all clients requests
server.use(cors());
server.get('/', homeHandler);
server.get('/favorite', favoriteHandler);

// trending Route
// http://localhost:4000/trending
server.get('/trending', newMovieHandler);

//search Route
// http://localhost:4000/of
server.get('/of', searchMovieHandler);

// popular Route
// http://localhost:4000/popular
server.get('/popular', popularMovieHandler);

// latest Route
// http://localhost:4000/latest
server.get('/latest', latestMovieHandler);

// Default Route 
// http://localhost:4000/ljfdnkf
server.get('*', pageHandler);

// http://localhost:4000/erorr
server.get('/erorr', erorrHandler0);

// middleware
server.use(errorHandler1);


// Lab12 constructor 
function Movie(id, title, name, release_date, first_air_date, poster_path, overview) {
  this.id = id;
  this.title = title || name;
  this.release_date = release_date || first_air_date;
  this.poster_path = poster_path;
  this.overview = overview;
}

// http://localhost:4000/
// Home Route
function homeHandler(req, res) {
  let obj = new Format(Data.title, Data.poster_path, Data.overview);
  res.json(obj);
}

// http://localhost:4000/favorite
// Favorite Route
function favoriteHandler(req, res) {
  let we = "Welcome to Favorite Page";
  res.send(we);
}

// http://localhost:4000/ljfdnkf
// Default Route 
function pageHandler(req, res) {
  let pageNotFound = new Handler(404, "page not found error");
  res.send(pageNotFound);
}



// data format constructor 
function Format(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}




// Handle errors constructor
function Handler(status, responseText) {
  this.status = status;
  this.responseText = responseText;
}


function erorrHandler0(req, res) {
  let serverErorr = new Handler(500, "Sorry, something went wrong");
  res.send(serverErorr);
}




function newMovieHandler(req, res) {
  try {
    // const APIKey = process.env.APIKey;
    let URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKey}&language=en-US`;
    axios.get(URL)
      .then((movieResult) => {

        let mapResult = movieResult.data.results.map((item) => {
          return new Movie(item.id, item.title, item.name, item.release_date, item.first_air_date, item.poster_path, item.overview);

        });
        res.send(mapResult);
      })
      .catch((error) => {
        console.log("sorry", err);
        res.status(500).send(err);
      })
  }

  catch (error) {
    errorHandler1(error, req, res);
  }
}

function searchMovieHandler(req, res) {
  try {
    //const APIKey = process.env.APIKey;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=of&page=1`;
    axios.get(URL)
      .then((movieResult) => {
        let mapResult = movieResult.data.results.map((item) => {
          return new Movie(item.id, item.title, item.name, item.release_date, item.first_air_date, item.poster_path, item.overview);
        });
        res.send(mapResult);
      })
      .catch((err) => {
        console.log("sorry", err);
        res.status(500).send(err);
      })
  }

  catch (error) {
    errorHandler1(error, req, res);
  }
}

function popularMovieHandler(req, res) {
  try {
    // const APIKey = process.env.APIKey;
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`;
    axios.get(URL)
      .then((movieResult) => {
        let mapResult = movieResult.data.results.map((item) => {
          return new Movie(item.id, item.title, item.name, item.release_date, item.first_air_date, item.poster_path, item.overview);
        });
        res.send(mapResult);
      })
      .catch((err) => {
        console.log("sorry", err);
        res.status(500).send(err);
      })
  }

  catch (error) {
    errorHandler1(error, req, res);
  }
}

function latestMovieHandler(req, res) {
  try {
    // const APIKey = process.env.APIKey;
    const URL = `https://api.themoviedb.org/3/movie/latest?api_key=${APIKey}&language=en-US`;
    axios.get(URL)
      .then((movieResult) => {
       console.log(movieResult);
        let mapResult =  new Movie(movieResult.data.id, movieResult.data.title, movieResult.data.name, movieResult.data.release_date, movieResult.data.first_air_date, movieResult.data.poster_path, movieResult.data.overview);
        res.json(mapResult);
      })
      .catch((err) => {
      console.log("sorry", err);
      res.status(500).send(err);
       })
  }

  catch (error) {
    errorHandler1(error, req, res);
  }
}

// middleware error handler
function errorHandler1(error, req, res) {
  const err = {
    status: 500,
    massage: error
  }
  res.status(500).send(err);
}

// to give the port number to the srever
server.listen(PORT, () => {
  console.log(`listening on PORT #${PORT} :I am ready`);
});

