var LocalStrategy = require("passport-local");
var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = require("passport");

module.exports.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function(email, password, done) {
    User.findOne({
      email: email,
      password: password
    }).exec(
      function(err, data) {
        if (err) {
          done(err, false);
        } else {
          if (_.isEmpty(data)) {
            done("Wrong Email or Password", false);
          } else {
            done(null, data);
          }
        }
      }
    );
  }
));


module.exports.use(new FacebookStrategy({
    clientID: "873276856121821",
    clientSecret: "3ecf121f8c741d41dd35d55dc0db711c",
    callbackURL: "/user/loginFacebook/",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {

    if (!_.isEmpty(profile)) {
      var user = User({
        name: profile.displayName,
        oauthLogin: [{
          socialProvider: profile.provider,
          socialId: profile.id+""
        }],
        status: 1
      });
      user.save(done);
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
    if (!_.isEmpty(profile)) {
      var user = User({
        name: profile.displayName,
        oauthLogin: {
          socialId: profile.id+"",
          socialProvider: profile.provider,
        },
        status: 1
      });
      user.save(function(err,data) {
        console.log(err);
        console.log(data);
        done(err,data);
      });
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
      var user = User({
        name: profile.displayName,
        oauthLogin: {
          socialId: profile.id+"",
          socialProvider: profile.provider,
        },
        status: 1
      });
      user.save(function(err,data) {
        console.log(err);
        console.log(data);
        done(err,data);
      });
    } else {
      done("There is an Error", false);
    }
  }
));
