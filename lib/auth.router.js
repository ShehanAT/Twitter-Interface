const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("./auth.controller");

//setting up the passport middleware for the Twitter OAuth provider
const twitterAuth = passport.authenticate("twitter");

//Routes that are triggered by the callbacks from the Twitter OAuth provider once
//the user has authenticated successfully

//This custom middleware allows use to attach the socket id to the session
//With that socket id we can send back the right user info to the right socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

// this route is triggered on the client

module.exports = router;
