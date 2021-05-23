const express = require('express');
const router = express.Router();
const catchAsync = require('../utilis/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',
    {failureRedirect: '/login',failureFlash: true }), users.login);;

router.get('/logout', users.logout);

module.exports = router;