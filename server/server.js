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

var userData = {}; // temp storage for user's data, delete once db is created

// if login is successful, create a session for the user
Authport.on('auth', function (req, res, data) {
  // store user data, replace this with query once we have a user table in db
  userData = {name: data.data.user.name, email: data.data.user.email, avatar: data.data.user.avatar_url};

  createSession(req, res, data.token);
});

Authport.on('error', function (req, res, data) {
  console.log('Failed');
  res.status(500).send({error: 'failed'});
});

app.get('/auth/:service', Authport.app);
// ----------------------------------------------------------

app.get('/', function (req, res) {
  // check if the user is logged in by checking his session,
  // if no session found redirect to makerpass login page
  if (!req.session.token) {
    res.redirect('/auth/makerpass');
  } else {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  }
});

// transfer this to a api router--------
app.get('/user', function (req, res) {
  res.json(userData);
});
// --------------------------------------

// Socket.io listeners / emitters
io.on('connection', function (socket) {
  console.log('a user connected');
  // Listen for Audience button clicks
  socket.on('updatePulse', function (action, currTime) {
    console.log('updatePulse event: ', action, currTime);
    // Broadcast to presenter (technically also everyone else)
    io.emit('updatedPulse', action, currTime);
  });
});

// helper function for creating a session
var createSession = function (req, res, token) {
  return req.session.regenerate(function () {
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
