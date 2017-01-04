exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  console.log("user_lectures")
  return knex('user_lectures').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea23aa', role: 'presenter'}),
        knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2355', role: 'presenter'}),
        knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'cc0001', role: 'presenter'}),
        knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: 'ea2351', role: 'audience'}),
        knex('user_lectures').insert({user_id: 'ea2f59c19983', lecture_id: '12dwwa', role: 'audience'}),
        knex('user_lectures').insert({user_id: '114267757081727627546', lecture_id: 'cc0001', role: 'audience'}),
        knex('user_lectures').insert({user_id: '110709938641205847283', lecture_id: 'cc0001', role: 'audience'}),
        knex('user_lectures').insert({user_id: 'a083b72cbc4b', lecture_id: 'cc0001', role: 'audience'})
      ]);
    });
};

//  id |        user_id        | lecture_id |   role    
// ----+-----------------------+------------+-----------
//   3 | ea2f59c19983          | ea23aa     | presenter
//   4 | ea2f59c19983          | ea2355     | presenter
//   5 | ea2f59c19983          | cc0001     | presenter
//   6 | ea2f59c19983          | ea2351     | audience
//   7 | ea2f59c19983          | 12dwwa     | audience
//   8 | 114267757081727627546 | cc0001     | audience
//   9 | 110709938641205847283 | cc0001     | audience
//  10 | a083b72cbc4b          | cc0001     | audience