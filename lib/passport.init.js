const passport = require("passport");
const { Strategy: TwitterStrategy } = require("passport-twitter");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { TWITTER_CONFIG, GOOGLE_CONFIG } = require("../config");
module.exports = () => {
  passport.serializeUser((user, cb ) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, ojb));
  //The callback that is invoked when an OAuth provider sends back user
  //information. Normally, you would save the user to the database
  //in this callback and it would be customized for each provide
  const callback = (accessToken, refreshToken, profile, cb) =>
    cb(null, profile);
  //cb is equivalent to next()
  //callback variable contains function taking 4 params then use cb(callback) to return null, profile(also a param)
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    scope: ["https://mail.google.com/", "https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/gmail.readonly"]
  }, (accessToken, refreshToken, profile, cb) => {
    cb(null, accessToken);
  }));
  //Adding twitter's OAuth provider's strategy to passport
}
