// js file for accessing the database
var db = require('./db.js');

module.exports = {
  // getting user information from the users table
  getUser: function (req, res) {
    db('users').where('id', req.session.token)
      .then(function (data) {
        var user = data[0];
        res.send({name: user.name, avatar: user.avatar, email: user.email});
      });
  },
  saveUser: function (user) {
    return db('users').where('id', user.id)
      .then(function (res) {
        if (res.length > 0) {
          // if user exist in the database update user info
          return db('users').where('id', user.id).update(user);
        } else {
          console.log("didn't exist");
          // save user info to the database then return a promise
          return db('users').insert(user);
        }
      });
  },
  getUserLectures: function (req, res) {
    var user = req.session.token;
    db.select('*').from('lectures')
    .join('user_lectures', 'lectures.id', 'user_lectures.lecture_id')
    .where({user_id: user}).orderBy('date', 'desc')
    .then(function (data) {
      console.log('presentations', data);
      res.send(data);
    });
  }
};
