require("dotenv").config();
var express = require("express");
// const Twit = require("twit"); //twitter API package
var app = express();
// const pug = require("pug");
const fs = require("fs");
const passportInit = require("./lib/passport.init");
const passport = require("passport");
const session = require("express-session");
const authRouter = require("./lib/auth.router");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const https = require("https");
//path.resolve() resolves a sequence of paths or path segments into an absolute path.
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); //parses incoming request bodies in a middleware before your handler
// var config = require("./config.js");
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./setup");
let server; //variable to store server object

//On an HTTPS page, any requests to load Javasript from an HTTP URL
//will be blocked. So if you're developing locally using HTTP, you might a script tag
//that works fine on your development machine, but breaks when you deploy to your HTTPS production site.
//TO catch this kind of problem, it's useful to set up HTTPS on your local web server.
//The best option: Generate your own certificate, either self-signed or signed by a local root, and
//trust it in your operating system's trust store. Then use that certificate in your local web server.

//if we are in production we are running in https by default
if (process.env.NODE_ENV == "production") {
  server = http.createServer(app);
} else {
  //for development environment we create a https server
  const certOptions = {
    key: fs.readFileSync(path.resolve("cert/localhost.key")), //points to dirname/cert/localhost.key
    cert: fs.readFileSync(path.resolve("cert/localhost.crt"))
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
// app.use(cookieParser());

// const port = process.env.PORT || 3000;
//loading view engine
// app.set("views", path.join(__dirname + "/views"));
// app.set("view engine", "pug");
// app.use(express.static(__dirname + "/"));
// app.use(express.static(__dirname + "/css"));
// app.use(express.static(__dirname + "/views"));

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

//Directing other requests to the auth router
app.use("/", authRouter);

//app.get("/", function(req, res, next) {
//get request for the home page
// var T = new Twit(config); //configuring the config.js file

// Promise.all([
//   //using promises to get the required information, 5 objects for each get request
//   T.get("friends/list", {
//     count: 5
//   }),
//   T.get("statuses/user_timeline", {
//     count: 5
//   }),
//   T.get("direct_messages/events/list", {
//     count: 5
//   }),
//   T.get("direct_messages/events/list", {
//     count: 5
//   })
// ])
//   .then(
//     ([
//       getFriendsList,
//       getUserTimeline,
//       getDirectMessage,
//       getSentDirectMessage
//     ]) => {
//       const moment = require("moment");
//       var allInfo = {
//         friendsList: getFriendsList.data,
//         timelineInfo: getUserTimeline.data,
//         recievedDMs: getDirectMessage.data,
//         sentDMs: getSentDirectMessage.data,
//         moment: moment //needed to format dates
//       };
//       //if (allInfo["recievedDMs"][0].sender.profile_image_url) {
//       res.render("./partials/index.pug", { allInfo }); //render the pug file with the required information
//       // } else {
//       //   console.log(allInfo);
//       //   res.status(500).render("./error/error.pug");
//       // }
//     }
//   )
//   .catch((err) => {
//     var err = new Error("Not Found");
//     err.status = 500;
//     res.status(500).render("error/error.pug");
//   });
//});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening...");
});
// app.use("/*", function(req, res, next) {
//   //route for not found link, displays page with redirect option to home page
//   var err = new Error("Not Found");
//   err.status = 404;
//   res.status(404).render("error/error.pug");
// });

// var io = require("socket.io").listen(server); //using socket.io to generate tweeted message without refreshing page
// io.sockets.on("connection", function(socket) {
//   //starting the socket.io connnection
//   socket.on("tweet_message", function(message) {
//     var moment = require("moment"); //variables to store the screen name, name, profile image of user
//     var T = new Twit(config); //configuring the config.js file
//     var screenName = "";
//     var name = "";
//     var profileImage = "";
//     var DateNow = moment(Date.now()).format("llll"); //using moment to format date.now()
//     T.post("statuses/update", {
//       //posting the tweet to Twitter
//       status: message
//     }).then(() => {
//       T.get("account/verify_credentials", {}) //verifying credentials, requesting user data object
//         .then((info) => {
//           screenName = info.data.screen_name; //storing the user information in variables
//           name = info.data.name;
//           profileImage = info.data.profile_image_url;
//         })
//         .then(() => {
//           //making new li tag with the newly tweeted message, user screen name, name, and date
//           var newTweet =
//             `
//                     <li>
//                     <strong class="app--tweet--timestamp">${DateNow}</strong>
//                     <a class="app--tweet--author">
//                       <div class="app--avatar" style="background-image: url(${profileImage})">
//                         <img src="${profileImage}" />
//                       </div>
//                       <h4>${name}</h4>
//                       @ ${screenName}
//                     </a>
//                     <p>` +
//             message +
//             `</p>
//                     <ul class="app--tweet--actions circle--list--inline">
//                       <li>
//                         <a class="app--reply">
//                           <span class="tooltip">Reply</span>
//                           <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 38 28" xml:space="preserve">
//                             <path d="M24.9,10.5h-8.2V2.8c0-1.1-0.7-2.2-1.7-2.6c-1-0.4-2.2-0.2-3,0.6L0.8,12c-1.1,1.1-1.1,2.9,0,4L12,27.2
//                             c0.5,0.5,1.2,0.8,2,0.8c0.4,0,0.7-0.1,1.1-0.2c1-0.4,1.7-1.5,1.7-2.6v-7.7h8.2c3.3,0,6,2.5,6,5.6v1.3c0,2,1.6,3.5,3.5,3.5
//                             s3.5-1.6,3.5-3.5v-1.3C38,16.2,32.1,10.5,24.9,10.5z"/>
//                           </svg>
//                         </a>
//                       </li>
//                       <li>
//                         <a class="app--retweet">
//                           <span class="tooltip">Retweet</span>
//                           <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 28" xml:space="preserve">
//                             <path d="M25.2,22.4H13.1v-9.3h4.7c1.1,0,2.2-0.7,2.6-1.7c0.4-1,0.2-2.3-0.6-3.1l-7.5-7.5c-1.1-1.1-2.9-1.1-4,0L0.8,8.3
//                             c-0.8,0.8-1,2-0.6,3.1c0.4,1,1.5,1.7,2.6,1.7h4.7v12.1c0,1.5,1.3,2.8,2.8,2.8h14.9c1.5,0,2.8-1.3,2.8-2.8
//                             C28,23.7,26.7,22.4,25.2,22.4z"/>
//                             <path d="M49.8,16.7c-0.4-1-1.5-1.7-2.6-1.7h-4.7V2.8c0-1.5-1.3-2.8-2.8-2.8H24.8C23.3,0,22,1.3,22,2.8s1.3,2.8,2.8,2.8h12.1v9.3
//                             h-4.7c-1.1,0-2.2,0.7-2.6,1.7c-0.4,1-0.2,2.3,0.6,3.1l7.5,7.5c0.5,0.5,1.3,0.8,2,0.8c0.7,0,1.4-0.3,2-0.8l7.5-7.5
//                             C50,18.9,50.2,17.7,49.8,16.7z"/>
//                           </svg>
//                           <strong>0</strong>
//                         </a>
//                       </li>
//                       <li>
//                         <a class="app--like">
//                           <span class="tooltip">Like</span>
//                           <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 28" xml:space="preserve">
//                             <path class="st0" d="M25.8,0c-3.6,0-6.8,2.1-8.3,5.1C16,2.1,12.9,0,9.2,0C4.1,0,0,4.1,0,9.2C0,21.4,17.3,28,17.3,28S35,21.3,35,9.2
//                             C35,4.1,30.9,0,25.8,0L25.8,0z"/>
//                           </svg>
//                           <strong>0</strong>
//                         </a>
//                       </li>
//                     </ul>
//                   </li>`;
//           io.emit("tweet_message", newTweet); //sending the new li object to be rendered
//         });
//     });
//   });
// });
