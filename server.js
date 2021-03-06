'use strict';


//Environmental Variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;



//application dependencies
const express = require('express');
const app = express();

// Database setup
const client = require('./util/database');

//Middleware
const cors = require('cors');
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))




// API Routes
const bookHandler = require('./modules/book');
app.post('/searches', bookHandler);








//Get Index
app.get('/', (request, response) => {
    response.render('pages/index');
});

//Get newPage
app.get('/searches/new', (request, response) => {
    response.render('pages/searches/show');
});

//render the search form 
// app.get('/', searchRendering);


//Handle errors
// function handleError(error, response) {
//     response.render('pages/error', { error: error });
//   }


//Client connect
client.connect()
  .then(() => {
    console.log('Database/PG connected.');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch(error => {
    throw `Something went wrong: ${error}`;
  });
