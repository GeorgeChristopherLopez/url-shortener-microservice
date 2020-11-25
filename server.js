const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// dotenv 
require('dotenv/config');
require('dotenv').config();

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// mongoose + mongodb
mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true , useUnifiedTopology: true },()=>{
  console.log("Connected to MongoDB!")
} );
const con = mongoose.connection;

//Routes
const shorturl = require('./routes/shorturls');
app.use('/api/shorturl', shorturl);


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

/*
*/

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
