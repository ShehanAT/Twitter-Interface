exports.twitterData = (req, res) => {
    const io = req.app.get("io");
    const Twit = require("twit");
    const keys = require("../keys");
    const screen_name = req.user_screen_name;
    var T = new Twit(keys); //configuring the config.js file
    Promise.all([
      //using promises to get the required information, 5 objects for each get request
      T.get("friends/list", { screen_name: screen_name, count: 5 }),
      T.get("statuses/user_timeline", {
        screen_name: screen_name,
        count: 5
      }),
      T.get("followers/list", {
        screen_name: screen_name,
        count: 5
      }),
      T.get("favorites/list", {
        screen_name: screen_name,
        count: 5
      })
    ]).then(
      ([getFriendsList, getUserTimeline, getFollowerList, getLikedTweets]) => {
        //
        const moment = require("moment");
        var allInfo = {
          friendsList: getFriendsList.data,
          timelineInfo: getUserTimeline.data,
          followerList: getFollowerList.data,
          likedTweets: getLikedTweets.data,
          moment: moment //needed to format dates
        };
        console.log(allInfo);
        io.in(req.session.socketId).emit("twitterData", allInfo);
        //send allInto to react thru socket.io
        res.end();
      });
}
exports.gmailData = (req, res) => {
  const io = req.app.get("io");
  // console.log(req);
  var accessToken = req.user;
  var Gmail = require('node-gmail-api')
  , gmail = new Gmail(accessToken)
  , s = gmail.messages('label:inbox', {fields: ["id", "internalDate", "labelIds", "payload", "snippet"], max: 10})
s.on('data', function (gmailInfo) {
  io.in(req.session.socketId).emit("gmailData", gmailInfo);
});
  
  res.end();
}