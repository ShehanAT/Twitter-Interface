// module.exports = {
//   consumer_key: process.env.CONSUMERKEY,
//   consumer_secret: process.env.CONSUMERSECRET,
//   access_token: process.env.ACCESSTOKEN,
//   access_token_secret: process.env.ACCESSTOKENSECRET,
//   timeout_ms: 60 * 1000 //optional HTTP request timeout to apply to all requests
// };
export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://agile-thicket-44316.herokuapp.com"
    : "http://127.0.0.1:3000";
