
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_clicks').del()
    .then(function () {
      return knex('user_lectures').del()
      .then(function () {
        return knex('users').del()
        .then(function () {
          return Promise.all([
          // Inserts seed entries
            knex('users').insert({id: '114267757081727627546', name: 'Sneaky Ross Topol', avatar: 'https://lh4.googleusercontent.com/-ENvzYvvyW_k/AAAAAAAAAAI/AAAAAAAAEOA/_nB-8dk8arg/photo.jpg', email: 'test@test.mail.com'}),
            knex('users').insert({id: '110709938641205847283', name: 'Ari Gold Frankel', avatar: 'https://lh5.googleusercontent.com/-F0mWWBnynZI/AAAAAAAAAAI/AAAAAAAAP6o/IXUujroyAlo/photo.jpg', email: 'test@test.mail.com'}),
            knex('users').insert({id: 'a083b72cbc4b', name: 'Sheel Freeway Rick Bedi', avatar: 'https://avatars.githubusercontent.com/u/13170829?v=3', email: 'sheel.bedi@gmail.com'}),
            knex('users').insert({id: 'ea2f59c19983', name: 'Christian The Hammer Aquino', avatar: 'https://avatars.githubusercontent.com/u/17533705?v=3', email: 'christianaquino223@gmail.com'}),
            knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea23aa', role: 'presenter'}),
            knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2355', role: 'presenter'}),
            knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'cc0001', role: 'presenter'}),
            knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2351', role: 'audience'}),
            knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: '12dwwa', role: 'audience'}),
            knex('user_lectures').insert({user_id: '114267757081727627546', lecture_id: 'cc0001', role: 'audience'}),
            knex('user_lectures').insert({user_id: '110709938641205847283', lecture_id: 'cc0001', role: 'audience'}),
            knex('user_lectures').insert({user_id: 'a083b72cbc4b', lecture_id: 'cc0001', role: 'audience'}),
            knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '114267757081727627546'}),
            knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '110709938641205847283'}),
            knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '110709938641205847283'}),
            knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '114267757081727627546'}),
            knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'}),
            knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'})
          ]);
        });
      });
    });
};

// user_lectures
// id |        user_id        | lecture_id |   role
// ea2f59c19983          | cc0001     | presenter
//   6 | ea2f59c19983          | ea2351     | audience
//   7 | ea2f59c19983          | 12dwwa     | audience
//   8 | 114267757081727627546 | cc0001     | audience
//   9 | 110709938641205847283 | cc0001     | audience
//  10 | a083b72cbc4b          | cc0001     | audience
// users_clicks
//                                                        Table "followme.users_clicks"
//   Column   |            Type             |                         Modifiers                         | Storage  | Stats target | Description
//  id | lecture_id |        user_id        |           date
  // 1 | cc0001     | 114267757081727627546 |
  // 2 | cc0001     | 110709938641205847283 |
  // 3 | cc0001     | 114267757081727627546 |
  // 4 | cc0001     | a083b72cbc4b          |
  // 5 | cc0001     | a083b72cbc4b          |
//   users
//             id           |       name       |                                            avatar                                            |            email
// -----------------------+------------------+----------------------------------------------------------------------------------------------+------------------------------
//  114267757081727627546 | Ross Topol       | https://lh4.googleusercontent.com/-ENvzYvvyW_k/AAAAAAAAAAI/AAAAAAAAEOA/_nB-8dk8arg/photo.jpg | test@test.mail.com
//  110709938641205847283 | Ari Frankel      | https://lh5.googleusercontent.com/-F0mWWBnynZI/AAAAAAAAAAI/AAAAAAAAP6o/IXUujroyAlo/photo.jpg | test@test.mail.com
//  a083b72cbc4b          | Sheel Bedi       | https://avatars.githubusercontent.com/u/13170829?v=3                                         | sheel.bedi@gmail.com
//  ea2f59c19983          | Christian Aquino | https://avatars.githubusercontent.com/u/17533705?v=3                                         | christianaquino223@gmail.com
