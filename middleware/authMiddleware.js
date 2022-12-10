const Authenticate = function (req, res, next) {
  if (req.session && req.session.user && req.session.authenticated)
    return next();
  else return res.redirect("/public/login");
};
module.exports = Authenticate;
