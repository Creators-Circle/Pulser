// file for setting all the routes
var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/user', controllers.getUser);
router.get('/userPresentation', controllers.getUserPresentations);

module.exports = router;
