
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_clicks').del()
    .then(function () {
      return knex('user_lectures').del()
      .then(function () {
        return knex('questions').del()
        .then(function () {
          return knex('users').del()
          .then(function () {
            return knex('lectures').del()
            .then(function () {
              return Promise.all([
                knex('lectures').insert({id: 'cc0001', name: 'sample presentation', presentation_id: 'sample1', preview_image: 'https://www.engageselling.com/blog/wp-content/uploads/2014/12/RefreshBLogDecember2nd.jpg'}),
                knex('lectures').insert({id: 'cc0002', name: 'sample presentation', presentation_id: 'sample2', preview_image: 'https://blognumbers.files.wordpress.com/2010/09/2.jpg'}),
                knex('users').insert({id: '114267757081727627546', name: 'Sneaky Ross Topol', avatar: 'https://lh4.googleusercontent.com/-ENvzYvvyW_k/AAAAAAAAAAI/AAAAAAAAEOA/_nB-8dk8arg/photo.jpg', email: 'test@test.mail.com'}),
                knex('users').insert({id: '110709938641205847283', name: 'Ari Gold Frankel', avatar: 'https://lh5.googleusercontent.com/-F0mWWBnynZI/AAAAAAAAAAI/AAAAAAAAP6o/IXUujroyAlo/photo.jpg', email: 'test@test.mail.com'}),
                knex('users').insert({id: 'a083b72cbc4b', name: 'Sheel Freeway Rick Bedi', avatar: 'https://avatars.githubusercontent.com/u/13170829?v=3', email: 'sheel.bedi@gmail.com'}),
                knex('users').insert({id: 'ea2f59c19983', name: 'Christian The Hammer Aquino', avatar: 'https://avatars.githubusercontent.com/u/17533705?v=3', email: 'christianaquino223@gmail.com'}),
                knex('questions').insert({lecture_id: 'cc0001', user_id: 'ea2f59c19983', question: 'help', votes: 2}),
                knex('questions').insert({lecture_id: 'cc0001', user_id: 'ea2f59c19983', question: 'this is not clear', votes: 1}),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea23aa', role: 'presenter', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2355', role: 'presenter', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'cc0001', role: 'presenter', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2351', role: 'audience', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: '12dwwa', role: 'audience', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: '114267757081727627546', lecture_id: 'cc0001', role: 'audience', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: '110709938641205847283', lecture_id: 'cc0001', role: 'audience', comment:, no_of_clicks: }),
                knex('user_lectures').insert({user_id: 'a083b72cbc4b', lecture_id: 'cc0001', role: 'audience'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '114267757081727627546'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '110709938641205847283'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: '114267757081727627546'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'}),
                knex('users_clicks').insert({lecture_id: 'cc0001', user_id: 'a083b72cbc4b'})
              ]);
            });
          });
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

//    id   |          name           |             date              | presentation_id 
// --------+-------------------------+-------------------------------+-----------------
//  ea23aa | test time presenttion   | 2017-01-03 22:36:58.674286+00 | 
//  ea2351 | test order presenttion  | 2017-01-03 22:37:13.609998+00 | 
//  ea2355 | test1 order presenttion | 2017-01-03 22:46:06.317797+00 | 
//  12dwwa | test server time        | 2017-01-03 22:53:48.70374+00  | 
//  112355 | test1 order presenttion | 2017-01-03 22:55:19.220139+00 | 
//  cc0001 | sample presentation     | 2017-01-03 22:58:04.039861+00 | 

// questions
//  id | lecture_id |   user_id    |    question     | votes 
// ----+------------+--------------+-----------------+-------
//   1 | ea23aa     | a083b72cbc4b | is this working |     0

