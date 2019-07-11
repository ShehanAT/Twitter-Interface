const passport = require("passport");
const { Strategy: TwitterStrategy } = require("passport-twitter");
const { TWITTER_CONFIG } = require("../setup");

module.exports = () => {
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, ojb));
  //The callback that is invoked when an OAuth provider sends back user
  //information. Normally, you would save the user to the database
  //in this callback and it would be customized for each provide
  const callback = (accessToken, refreshToken, profile, cb) =>
    cb(null, profile);
  //callback variable contains function taking 4 params then use cb(callback) to return null, profile(also a param)
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
  //Adding twitter's OAuth provider's strategy to passport
};
