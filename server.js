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

app.use(passport.initialize());
app.use(passport.session());

const ObjectID = require('mongodb').ObjectID;



myDB(async client => {
	const myDataBase = await client.db('databse').collection('users');
	
	// Be sure to change the title
	app.route('/').get((req, res) => {
		res.render('pug', {
			title: 'Connected to Database',
			message: 'Please login'
		});
	});
	
	// Serialization and deserialization here...
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id, done) => {
		myDataBase.findOne({ _id: new ObjectID(id)}, (err, doc) => {
			done(null, doc);
		});
	});
}).catch(e => {
	app.route('/').get((req, res) => {
		res.render('pug', {
			title: e, 
			message: 'Unable to login'
		});
	});
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});








