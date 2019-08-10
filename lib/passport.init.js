const passport = require("passport");
const { Strategy: TwitterStrategy } = require("passport-twitter");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { TWITTER_CONFIG, GOOGLE_CONFIG } = require("../config");
module.exports = () => {
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, ojb));
  //The callback that is invoked when an OAuth provider sends back user
  //information. Normally, you would save the user to the database
  //in this callback and it would be customized for each provide
  const callback = (accessToken, refreshToken, profile, cb) =>
    cb(null, profile);
  

  //cb is equivalent to next()
  //callback variable contains function taking 4 params then use cb(callback) to return null, profile(also a param)
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback));
  //Adding twitter's OAuth provider's strategy to passport
}
