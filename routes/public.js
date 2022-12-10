const Authenticate = require('../middleware/authMiddleware');
const User = require('../models/user');

const router = require('express').Router();

router.get('/login',(req,res) => {
    res.render('login', {authenticated: !!req.session.authenticated});
});

router.get('/compte', Authenticate, async (req,res) => {
    const currentUser = await User.findById(req.session.user._id);
    const d = new Date(currentUser.date)
    const dateStr = d.toDateString()
    res.render('compte', {authenticated: !!req.session.authenticated, compte: currentUser, date: dateStr});
});


router.get('/inscription',(req,res) => {
    res.render('inscription', {authenticated: !!req.session.authenticated});

});




module.exports = router;