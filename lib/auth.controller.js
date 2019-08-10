exports.twitter = (req, res, next) => {
  const io = req.app.get("io");
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value.replace(/_normal/, "")
  };
  io.in(req.session.socketId).emit("twitter", user);
  req.user_screen_name = req.user.username;
  next();
};
exports.google = (req, res) => {
  const io = req.app.get('io')
  const user = { 
    googleName: req.user.displayName,
    googlePhoto: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
  }
  io.in(req.session.socketId).emit('google', user)
  res.end()
}
