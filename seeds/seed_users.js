exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  console.log('users')
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: '114267757081727627546', name: 'Sneaky Ross Topol', avatar: 'https://lh4.googleusercontent.com/-ENvzYvvyW_k/AAAAAAAAAAI/AAAAAAAAEOA/_nB-8dk8arg/photo.jpg', email: 'test@test.mail.com'}),
        knex('users').insert({id: '110709938641205847283', name: 'Ari Gold Frankel', avatar: 'https://lh5.googleusercontent.com/-F0mWWBnynZI/AAAAAAAAAAI/AAAAAAAAP6o/IXUujroyAlo/photo.jpg', email: 'test@test.mail.com'}),
        knex('users').insert({id: 'a083b72cbc4b', name: 'Sheel Freeway Rick Bedi', avatar: 'https://avatars.githubusercontent.com/u/13170829?v=3', email: 'sheel.bedi@gmail.com'}),
        knex('users').insert({id: 'ea2f59c19983', name: 'Christian The Hammer Aquino', avatar: 'https://avatars.githubusercontent.com/u/17533705?v=3', email: 'christianaquino223@gmail.com'})
      ]);
    });
};