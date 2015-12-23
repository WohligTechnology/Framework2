var LocalStrategy = require("passport-local");
var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = require("passport");

module.exports.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(username, password, done) {
    sails.query(function(err, db) {
      var col = db.collection('user');
      // Show that duplicate records got dropped
      col.find({
        username: username
      }).toArray(function(err, items) {
        test.equal(null, err);
        test.equal(4, items.length);
        db.close();
      });
    });
  }
));


module.exports.use(new FacebookStrategy({
    clientID: "873276856121821",
    clientSecret: "3ecf121f8c741d41dd35d55dc0db711c",
    callbackURL: "/user/loginfacebook/",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    if (!_.isEmpty(profile)) {
      done(null, profile);
    } else {
      done("There is an Error", false);
    }
  }
));


module.exports.use(new TwitterStrategy({
    consumerKey: "gZPPSIqZHL3mqlgq76bBc4Yqq",
    consumerSecret: "FGZTNSrJjztzlSsoX5TzvnWzVTFfpbw4D8veCFH8ME75Jup2CK",
    callbackURL: "/user/logintwitter/",
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    if (!_.isEmpty(profile)) {
      done(null, profile);
    } else {
      done("There is an Error", false);
    }
  }
));


module.exports.use(new GoogleStrategy({
    clientID: "529279279497-nfmukh8oafihcv3d7b321bjn3mgljtt6.apps.googleusercontent.com",
    clientSecret: "0PVXCteO1WhsnnCrI-X59aDQ",
    callbackURL: "/user/loging"
  },
  function(token, tokenSecret, profile, done) {
    if (!_.isEmpty(profile)) {
      done(null, profile);
    } else {
      done("There is an Error", false);
    }
  }
));
