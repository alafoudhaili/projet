const User = require("../models/user");

const router = require("express").Router();

// Login endpoint
router.post("/login", async function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.send("login data missing");
  } else {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const isMatch = foundUser.password === req.body.password;
      if (isMatch) {
        req.session.user = foundUser;
        req.session.authenticated = true;
        res.redirect('/public/compte');
        
      }else res.send("wrong password");
    }else res.send("user not found");
  }
});
//Todo: authenticate from database with bcrypt.

router.post("/inscription", async function (req, res) {
  const newUser = new User(req.body);
  await newUser.save();
  res.redirect("/public/compte");
});

// Logout endpoint
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect('/public/login')
});

module.exports = router;
