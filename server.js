'use strict';
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');



const app = express();

fccTesting(app); //For FCC testing purposes


app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SETTING the view engine for Express JS
app.set('view engine', 'pug');

// Configure Express-session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
}));


app.route('/').get((req, res) => {
  res.render('pug/index', {
		title: 'Hello',
		message: 'Please login'
	});
});







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});












