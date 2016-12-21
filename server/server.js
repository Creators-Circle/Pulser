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
var credentials = require('./env/config.js');
var MP = require('node-makerpass');

//Stuff for Authport-Makerpass
// First set up sessions (independent of MakerPass and OAuth)
// This will give your middleware & endpoints access to req.session
//
var session = require('cookie-session');
AuthPort.registerService('makerpass', MakerpassService);


AuthPort.createServer({
  service: 'makerpass',
  id: 'd125322e59940ae2554e017b1bde13259f187bfd2e58c7dc24eed0ec52d980cf', //process.env.MAKERPASS_CLIENT_ID
  secret: 'd38f64490545506512960894df4d568759b5e7292792b6a777e0b4b65d740cbe',  //process.env.MAKERPASS_CLIENT_SECRET
  callbackURL: 'http://localhost:5000' + '/auth/makerpass/callback',
  // scope: 'admin.read admin.write',
})

AuthPort.on('auth', function (req, res, data) {
  console.log("OAuth success!", req);
  req.session.accessToken = data.token;
  res.redirect('/');
})

AuthPort.on('error', function(req, res, data) {
  console.log("OAuth failed.", data);
  res.status(500).send({ error: 'oauth_failed' })
});
//END authport stuff.

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
var deployedCallbackUrl = 'https://present-me-beta.herokuapp.com/';

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

// if login is successful, create a session for the user
Authport.on('auth', function (req, res, data) {
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
