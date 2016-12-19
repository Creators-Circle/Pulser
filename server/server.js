//TODO: FILTRATION BEFORE SENDING BACK EVENTS
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
//TODO: SOCKETS, DOTENV

// code from the express.static docs
app.use(express.static(path.join(__dirname, '/../client/'))); //TODO
app.use (bodyParser.json());

app.get('/', function(req,res){ //TODO
  //SERVE UP INDEX.HTML 
  res.sendFile(path.join(__dirname, /*very present*/ )); //TODO
});

//HEROKU ENV VAR OR LOCALHOST:5000
var port = process.env.PORT || 5000; 

app.listen(port, function() {
 console.log("Listening on " + port);
});