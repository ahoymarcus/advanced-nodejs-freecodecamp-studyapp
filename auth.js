const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;
const GitHubStrategy = require('passport-github');



module.exports = function(app, myDataBase) {

	// Serialization and deserialization here...
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id, done) => {
		myDataBase.findOne({ _id: new ObjectID(id)}, (err, doc) => {
			done(null, doc);
		});
	});
	
	passport.use(new LocalStrategy(
		function(username, password, done) {
			myDataBase.findOne({username: username }, function(err, user) {
				console.log('User ' + username + ' attempted to log in.');
				if(err) { return done(err); }
				if (!user) { return done(null, false); }
				
				// SUBSTITUIR por VALIDAÇÃO com HASH
				/*if (password !== user.password) {return done(null, false); }*/
				if (!bcrypt.compareSync(password, user.password)) {
					return done(null, false);
				}
				
				return done(null, user);
			});
		}
	));
	
	const callbackURL_replit = "https://advanced-nodejs-study-app.ahoymarcus.repl.co/callback";
	const callbackURL_local = "http://localhost:3000//callback";
	passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: callbackURL_local
	},
		function(accessToken, refreshToken, profile, cb) {
			console.log(profile);
			
			//Database logic here with callback containing our user object
		}
	));
	
}







