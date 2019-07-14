const providers = ["twitter"];
const callbacks = providers.map((provider) => {
  return process.env.NODE_ENV === "production"
    ? `https://delicat-fromage-49726.herokuapp.com/${provider}/callback`
    : `http://127.0.0.1:3000/${provider}/callback`;
});
//const [twitterURL, googleURL, facebookURL, githubURL] = callbacks <-passing the callbacks object to
//multiple variables in a single line
const [twitterURL] = callbacks; //passing the callbacks object to only twitter for the purposes of this application

exports.CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://delicat-fromage-49726.herokuapp.com/"
    : "http://localhost:4000";

exports.TWITTER_CONFIG = {
  consumerKey: process.env.CONSUMERKEY,
  consumerSecret: process.env.CONSUMERSECRET,
  callbackURL: twitterURL
};
