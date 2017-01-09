
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('lectures', function (table) {
      table.boolean('guest').defaultTo(true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('lectures', function (table) {
      table.dropColumn('guest');
    })
  ]);
};
