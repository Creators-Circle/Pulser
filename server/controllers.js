// js file for accessing the database
var db = require('./db.js');

module.exports = {
  // getting user info from the database
  getUser: function (req, res) {
    db('users').where('id', req.session.token)
      .then(function (data) {
        var user = data[0];
        res.send({name: user.name, avatar: user.avatar, email: user.email});
      });
  },
  saveUser: function (user) {
    db('users').where('id', user.id)
      .then(function (res) {
        if (res.length > 0) {
          // if user exist in the database update user info
          db('users').where('id', user.id).update(user);
        } else {
          // save user info to the database
          db('users').insert(user);
        }
      });
  }
};
