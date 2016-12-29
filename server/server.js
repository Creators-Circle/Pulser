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

// code from the express.static docs
app.use('/static', express.static(path.join(__dirname, '/../client/public/static')));
app.use(bodyParser.json());
app.use(session({
  secret: 'this is secret',
  resave: false,
  saveUninitialized: true
}));

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
  service: "google",
  id: process.env.GOOGLE_ID,
  secret: process.env.GOOGLE_SECRET,
  scope: ""
});

var userData = []; // temp storage for user's data, delete once db is created
var audienceOnly = false; // switch variable for whether or not there is a presenter already

// if login is successful, create a session for the user
Authport.on('auth', function (req, res, data) {

  // depending on which login option the user chooses, send them to appropriate service
  switch(data.service) {
    case 'makerpass':
      userData.push({token: data.token, name: data.data.user.name, email: data.data.user.email, avatar: data.data.user.avatar_url});
      createSession(req, res, data.token);
      break;

    case 'google':
      userData.push({token: data.token, name: data.data.name, email: 'test@test.mail.com', avatar: data.data.picture});
      createSession(req, res, data.token);
      break;
    }
  // store user data, replace this with query once we have a user table in db
});

Authport.on('error', function (req, res, data) {
  console.log('Failed');
  res.status(500).send({error: 'failed'});
});

app.get('/auth/:service', Authport.app);
// ----------------------------------------------------------

app.get('/', function (req, res) {
  // check if the user is logged in by checking his session,
  // if no session found redirect to auth crossroads page (google / github)
  if (!req.session.token) {
    res.sendFile(path.join(__dirname, '/../client/public/auth.html'));
  } else {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  }
});

// let the App know whether or not there is already a presenter
app.get('/audienceOnly', function (req, res) {
  // console.log('about to send audienceOnly response ', audienceOnly);
  res.send({audienceOnly: audienceOnly});
});

// Vestigial HotFix Route
// resets the audienceOnly switch to false.
app.get('/!audienceOnly', function (req, res) {
  // console.log('received an !audienceOnly request');
  audienceOnly = false;
  res.send('audienceOnly set to false');
});

// transfer this to a api router--------
app.get('/user', function (req, res) {
  console.log('user', req.session.id);
  let user = userData.filter((user) => user.token === req.session.token);
  res.json(user[0]);
});
// --------------------------------------

// Socket.io listeners / emitters
io.on('connection', function (socket) {
  console.log('a user connected');
  // Alert the presenter that an audience member has connected
  io.emit('connected');
  // Listen for audienceOnly event
  socket.on('audienceOnly', function () {
    audienceOnly = true;
    // console.log('server heard audienceOnly and emitted an audienceOnly event')
  });
  // Listen for !audienceOnly event, which is intended to undo the audienceOnly event
  socket.on('!audienceOnly', function () {
    audienceOnly = false;
  });
  // Listen for Audience button clicks
  socket.on('updatePulse', function (action, currTime) {
    // console.log('updatePulse event: ', action, currTime);
    // Broadcast to presenter (technically also everyone else)
    io.emit('updatedPulse', action, currTime);
  });

  socket.on('userClick', function (action, currTime, user) {
    io.emit('userClicked', action, currTime, user);
  });

  socket.on('disconnect', function () {
    console.log('a user disconnected');
    // Alert the presenter that an audience member has disconnected
    io.emit('disconnected');
  });
});

// helper function for creating a session
var createSession = function (req, res, token, name) {
  return req.session.regenerate(function () {
    req.session.token = token;
    req.session.name = name;
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
