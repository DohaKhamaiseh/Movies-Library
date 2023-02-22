'use strict' ;

// import express and cors
const express = require('express');
const cors = require('cors');

// import data.json
const Data = require('./Movie_Data/data.json');
console.log(Data);

const server = express();

// to make server open for all clients request
server.use(cors());


const PORT = 4000;

// data format constructor 
function Format (title,poster_path,overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview ;
   }


// Handle errors constructor
function Handler (status,responseText){
    this.status = status ;
    this.responseText = responseText ;
}

// http://localhost:4000/
// Home Route
server.get('/',(req,res)=>{  
    let obj = new Format (Data.title,Data.poster_path,Data.overview);
    res.json(obj); 
})

// http://localhost:4000/favorite
  // Favorite Route
  server.get('/favorite',(req,res)=>{  
    let we = "Welcome to Favorite Page" ;
    res.send(we);  
  }) 

  function erorrHandler1 (req,res){
    let serverErorr = new Handler(500,"Sorry, something went wrong");
    res.send(serverErorr);
  }

  function pageHandler (req,res){
    let pageNotFound = new Handler(404,"page not found error");
    res.send(pageNotFound);
  }

  // http://localhost:4000/erorr
  server.get('/erorr',erorrHandler1);

  // Default Route 
  // http://localhost:4000/ljfdnkf
  server.get('*',pageHandler);

  // to give the port number to the srever
  server.listen(PORT,() => {
    console.log(`listening on PORT #${PORT} :I am ready`);
    });
  