// TODO: FILTRATION BEFORE SENDING BACK EVENTS
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var Authport = require('authport');
var MakerpassService = require('authport-makerpass');
var session = require('express-session');
require('dotenv').config({silent: true});
var MP = require('node-makerpass');
var db = require('./db.js');
var router = require('./routes.js');
var controllers = require('./controllers.js');

// code from the express.static docs
app.use('/static', express.static(path.join(__dirname, '/../client/public/static')));
app.use(bodyParser.json());
app.use(session({
  secret: 'this is secret',
  resave: false,
  saveUninitialized: true
}));
app.use('/api', router);

// MakerPass Authentication ---------------------------------
Authport.registerService('makerpass', MakerpassService);

// callback urls for MakerPass Authentication
var localCallbackUrl = 'http://localhost:5000/auth/makerpass/callback';
var deployedCallbackUrl = 'https://present-me-beta.herokuapp.com/auth/makerpass/callback';

// provide credentials for making an Authport server
// These references to process.env will look for environment variables
  // Deployment: set these in Heroku
  // Local: save them in a .env file in the root directory - see dotenv npm for docs
    // .gitignore includes the .env - this is advisable
Authport.createServer({
  service: 'makerpass',
  id: process.env.MAKERPASS_ID,
  secret: process.env.MAKERPASS_SECRET,
  callbackURL: deployedCallbackUrl || localCallbackUrl
});

var google = Authport.createServer({
  service: 'google',
  id: process.env.GOOGLE_ID,
  secret: process.env.GOOGLE_SECRET,
  scope: ''
});

var audienceOnly = false; // switch variable for whether or not there is a presenter already

// if login is successful, create a session for the user
Authport.on('auth', function (req, res, data) {
  let userInfo = {};// temp storage for user information that needs to be passed to contollers.saveUser function
  // depending on which login option the user chooses, send them to appropriate service
  switch (data.service) {
    case 'makerpass':
      userInfo.id = data.data.user.uid;
      userInfo.name = data.data.user.name;
      userInfo.avatar = data.data.user.avatar_url;
      userInfo.email = data.data.user.email;

      controllers.saveUser(userInfo)
      .then(function () {
        createSession(req, res, userInfo.id);
      });
      break;

    case 'google':
      userInfo.id = data.id;
      userInfo.name = data.data.name;
      userInfo.avatar = data.data.picture;
      userInfo.email = 'test@test.mail.com';

      controllers.saveUser(userInfo)
      .then(function (data) {
        createSession(req, res, userInfo.id);
      });
      break;
  }
});

Authport.on('error', function (req, res, data) {
  console.log('Failed');
  res.status(500).send({error: 'failed'});
});

app.get('/auth/:service', Authport.app);

app.get('/', function (req, res) {
  // check if the user is logged in by checking his session,
  // if no session found redirect to auth crossroads page (google / github)
  if (!req.session.token) {
    res.sendFile(path.join(__dirname, '/../client/public/auth.html'));
  } else {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  }
});

app.get('/logout', function (req, res) {
  console.log('goodbye');
  req.session.destroy(function () {
    res.redirect('/');
  });
});
// a route to create a new socket namespace
app.post('/newRoom', function (req, res) {
  // console.log('room in post request', req.body.room);
  // launch a custom namespace called 'nsp' for the presentation 'room'
  let nsp = io.of(`/${req.body.room}`);
  // ------------------------------------
  // Socket.io listeners / emitters for the presentation 'room'
  nsp.on('connection', function (socket) {
    console.log('a user connected to ', nsp.name);

    // Emits connection message when user connects to specific namespace
    nsp.emit('connected');

    // Listen for audience request for presentation URL
    socket.on('presentationUrlRequest', function () {
      // console.log('User requesting presentationUrl');
      // Send request to presenter (technically also everyone else)
      nsp.emit('presentationUrlRequest');
    });

    // Listen for new lecture event
    socket.on('newLecture', function (lecture) {
      // console.log('Presenter selected a presentation');
      controllers.saveLecture(lecture);
    });

    // Listen for presenter's response with presesntation URL
    socket.on('presentationUrlResponse', function (presentationUrl) {
      // console.log('Lecturer responding with presentationUrl');
      // Send response to audience member
      nsp.emit('presentationUrlResponse', presentationUrl);
    });

    // Listen for Audience button clicks
    socket.on('updatePulse', function (action, currTime) {
      // console.log('updatePulse event: ', action, currTime);
      // Broadcast to presenter (technically also everyone else)
      nsp.emit('updatedPulse', action, currTime);
    });
    // Listen for user clicks
    socket.on('userClick', function (action, currTime, name, userId, lectureId) {
      // console.log('userClick event: ', action, currTime, name, userId, lectureId);
      // Broadcast to presenter (technically also everyone else)
      nsp.emit('userClicked', action, currTime, name);
      console.log('u, l, d', userId, lectureId, currTime);
      let click = {
        userId: userId,
        lectureId: lectureId,
        date: currTime
      };
      controllers.saveClick(click);
    });

    socket.on('disconnect', function (socket) {
      console.log('a user disconnected from ', nsp.name);
      // Alert the presenter that an audience member has disconnected
      nsp.emit('disconnected');
    });
  });
  res.send('post accepted');
});
// --------------------------------------

// helper function for creating a session
var createSession = function (req, res, token) {
  return req.session.regenerate(function () {
    // set user id as an access token for now, need to refactor later
    req.session.token = token;
    res.redirect('/');
  });
};

// HEROKU OR DOTENV VAR OR LOCALHOST:5000
// Check to see if there is a port environment variable or just use port 5000 instead
module.exports.NODEPORT = process.env.PORT || 5000;
var port = process.env.PORT || 5000;

// http server listening to port (HTTP needed for Socket.io)
http.listen(port, function () {
  console.log('Listening on ' + port);
});
