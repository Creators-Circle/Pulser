// file for setting all the routes
var router = require('express').Router();
var controllers = require('./controllers.js');

router.get('/user', controllers.getUser);
router.get('/userLectures', controllers.getUserLectures);
module.exports = router;
