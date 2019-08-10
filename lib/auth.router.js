const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("./auth.controller");
const apiController = require("../api/controller");
//setting up the passport middleware for the Twitter OAuth provider
const twitterAuth = passport.authenticate("twitter");
const googleAuth = passport.authenticate("google", { scope: ['profile'] })//<-stuck at this point



//define the callback url routes for each OAuth provider, this is what the app will do after receiving tokens from the OAuth server 
//authController.<providerName> is middleware that gets the display name and a photo(if available) of the authenticated user.
//these routes will be trigger by the OAuth server once user grants permission for the application to access their scoped data
router.get("/twitter/callback", twitterAuth, authController.twitter, apiController.twitterData);
router.get("/google/callback", googleAuth, authController.google); //<-not getting to this point 


//Routes that are triggered by the callbacks from the Twitter OAuth provider once
//the user has authenticated successfully

//This custom middleware allows use to attach the socket id to the session
//With that socket id we can send back the right user info to the right socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get("/twitter", twitterAuth);
router.get("/google", googleAuth);


// this route is triggered on the client

module.exports = router;
