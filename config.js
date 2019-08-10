<<<<<<< HEAD
const providers = ['twitter', 'google'];

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://agile-thicket-44316.herokuapp.com/"
    : "https://localhost:4000";

const callbacks = providers.map(provider => {
    return process.env.NODE_ENV === 'production'
      ? `https://agile-thicket-44316.herokuapp.com/${provider}/callback`
      : `https://localhost:3000/${provider}/callback`
  });

  const [twitterURL, googleURL] = callbacks


const TWITTER_CONFIG = {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    callbackURL: twitterURL //using https instead of http because we made https://localhost secure so https should work
  };

const GOOGLE_CONFIG = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: googleURL //using https instead of http because we made https://localhost secure so https should work
};

module.exports = {
  TWITTER_CONFIG, GOOGLE_CONFIG
}


=======
module.exports = {
  consumer_key: process.env.CONSUMERKEY,
  consumer_secret: process.env.CONSUMERSECRET,
  access_token: process.env.ACCESSTOKEN,
  access_token_secret: process.env.ACCESSTOKENSECRET,
  timeoutg_ms: 60 * 1000 //optional HTTP request timeout to apply to all requests
};
// export const API_URL = process.env.NODE_ENV === "production"
// ? "https://agile-thicket-44316.herokuapp.com" : "https://localhost:8080"
>>>>>>> b41567cf59b05c991c07da83bec01968230b338f
