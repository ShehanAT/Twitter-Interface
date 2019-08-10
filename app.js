require("dotenv").config();
var express = require("express");
const Twit = require("twit"); //twitter API package
var app = express();

const authRouter = require("./lib/auth.router");
const apiRouter = require("./api/routes");
const passportInit = require("./lib/passport.init");
const passport = require("passport");
const session = require("express-session");
const https = require("https");
const socketio = require("socket.io");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;


//path.resolve() resolves a sequence of paths or path segments into an absolute path.
const bodyParser = require("body-parser"); //parses incoming request bodies in a middleware before your handler
// var config = require("./config.js");
const cors = require("cors");

const { CLIENT_ORIGIN } = require("./config");
const keys = require("./keys");

let server; //variable to store server object

//On an HTTPS page, any requests to load Javasript from an HTTP URL
//will be blocked. So if you're developing locally using HTTP, you might a script tag
//that works fine on your development machine, but breaks when you deploy to your HTTPS production site.
//TO catch this kind of problem, it's useful to set up HTTPS on your local web server.
//The best option: Generate your own certificate, either self-signed or signed by a local root, and
//trust it in your operating system's trust store. Then use that certificate in your local web server.

//if we are in production we are running in https by default
if (process.env.NODE_ENV == "production") {
  server = https.createServer(app);
} else {
  //for development environment we create a https serve
  const certOptions = {
    key: fs.readFileSync(path.resolve("certs/server.key")), //points to dirname/cert/localhost.key
    cert: fs.readFileSync(path.resolve("certs/server.crt"))
  };
  server = https.createServer(certOptions, app);

}

app.use(
  bodyParser.urlencoded({
    //returns middleware that only parses urlencoded bodies and only looks at requests
    //where the 'Content-Type' header matches the 'type' option. This parser accepts only UTF-8 encoding of the body
    //and supports automatic inflation of gzip and deflate encodings.

    //a new body object containing the parsed data is populated on the request object after the middleware(req.body). This object will
    //contain key-value pairs, where the value can be a string or array(when extended is false)
    //or any type(when extended is true)
    extended: false
  })
);

//Setup for passport and to accept JSON objects
app.use(express.json());
app.use(passport.initialize());
passportInit();



//To accept requests from our client
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);



//saveUninitialized: true = allows us to attach the socket id to the session
//before we have authenticated the user
app.use(
  session({
    //creates a session middleware with the given options
    //Note: session data is not saved in the cookie itself, just the session ID is saved in the cookie
    //Session data is stored server-side
    //This module no longer needs cookie-parser, this module now directly reads
    //and writes cookies on req/res
    //Cookies are small files which are stored on a user's computer.
    //Cookies are designed to hold a modest amount of data specific to a particular client and website.
    secret: process.env.SESSIONSECRET,
    resave: true,
    saveUninitialized: true
  })
);

const io = socketio(server);
app.set("io", io);



//Catch a start up request so the sleepy Heroku instance
//can be responsive as soon as possible, when app is deployed to production
app.get("/wake-up", (req, res) => {
  res.send("Connected frontend to backend");
});

//This custom middleware picks off the socket id(that was put on req.query in client side OAuth component's openPopUp() method)
//and stores it in the session so we can send back the right information to the right socket

//the whole OAuth proces is handler is this file

app.use("/", authRouter);
app.use("/api", apiRouter);
//use node --inspect app.js to use google chrome debugger
server.listen(port, () => {
  console.log("listening on port: " + port);
});


