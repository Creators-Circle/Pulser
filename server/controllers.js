// js file for accessing the database
var db = require('./db.js');

module.exports = {
  // getting user information from the users table
  getUser: function (req, res) {
    db('users').where('id', req.session.token)
      .then(function (data) {
        var user = data[0] ||
          {name: 'guest',
            avatar: 'http://www.doctormacro.com/Images/Chaney%20Jr.,%20Lon/Annex/Annex%20-%20Chaney%20Jr.,%20Lon%20(Wolf%20Man,%20The)_07.jpg',
            email: 'guest@guest.com',
            id: req.session.token
          };
        res.send({name: user.name, avatar: user.avatar, email: user.email, id: user.id});
      });
  },
  saveUser: function (user) {
    return db('users').where('id', user.id)
      .then(function (res) {
        if (res.length > 0) {
          // if user exists in the database update user info
          return db('users').where('id', user.id).update(user);
        } else {
          console.log("didn't exist");
          // save user info to the database then return a promise
          return db('users').insert(user);
        }
      });
  },
  // save lecture info to the database then return a promise
  saveLecture: function (lecture) {
    return db('lectures').insert({
      id: lecture.id,
      name: lecture.name,
      presentation_id: lecture.presentationId
    })
      .then(() => {
        module.exports.userLecture(lecture);
      });
  },
  // Associate a lecture and a user in the user_lectures table
  userLecture: function (lecture) {
    return db('user_lectures').insert({
      user_id: lecture.userId,
      lecture_id: lecture.id,
      role: lecture.role
    })
      .then(() => {
        // console.log('successfully associated a lecture to a user' );
      });
  },
  // save a click to the database then return a promise
  saveClick: function (click) {
    return db('users_clicks').insert({
      lecture_id: click.lectureId,
      user_id: click.userId,
      date: click.date
    })
      .then((data) => {
        // console.log('successfully inserted');
      });
  },
  // function for getting all the lectures connected to the user
  getUserLectures: function (req, res) {
    var user = req.session.token;
    db.select('*').from('lectures')
    .join('user_lectures', 'lectures.id', 'user_lectures.lecture_id')
    .where({user_id: user}).orderBy('date', 'desc')
    .then(function (data) {
      res.send(data);
    });
  },
  // getting the summary for lectures
  getSummary: function (req, res) {
    var lectureId = req.params.lecture_id;
    var summary = {};
    // get all the users connected to the lecture
    db.select('*').from('users')
    .join('user_lectures', 'users.id', 'user_lectures.user_id')
    .where('lecture_id', lectureId)
    .then(function (users) { summary.users = users; })
    .then(function () {
      // get all the clicks of the users
      return db.select('*').from('users_clicks').where('lecture_id', lectureId);
    })
    .then(function (clicks) { summary.clicks = clicks; })
    .then(function () {
      // get all the questions for the lecture
      return db.select('*').from('questions').where('lecture_id', lectureId);
    }).then(function (questions) {
      summary.questions = questions;
      res.send(summary);
    });
  },
  // inserting comment in the database
  addComment: function (req, res) {
    var lectureId = req.params.lecture_id;
    var userId = req.params.user_id;
    var comment = req.body.comment;
    return db('user_lectures').where({lecture_id: lectureId, user_id: userId})
    .update({comment: comment})
    .then(function (data) {
      res.send('succes');
    });
  }
};
