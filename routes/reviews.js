const express = require('express');
var router = express.Router({ mergeParams: true});
const catchAsync = require('../utilis/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utilis/ExpressError');
const {campgroundSchema, reviewSchema} = require('../schemas');
const {isLoggedIn, isReviewAuthor, validateReview} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
 
 router.delete('/:reviewId',isLoggedIn, isReviewAuthor,
  catchAsync(reviews.deleteReview));
     


 module.exports = router;