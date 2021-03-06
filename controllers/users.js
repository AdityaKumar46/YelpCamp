const User = require('../models/user');
const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({ email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, function(err) {
            if (err) { return next(err); }
            req.flash('success','Welcome to Yelpcamp!');
            res.redirect('/campgrounds');
          });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Hope to see you back again!!!");
    res.redirect('/campgrounds');
}
