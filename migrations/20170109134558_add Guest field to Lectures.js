
exports.up = function (knex, Promise) {
  return Promise(
    knex.schema.table('lectures', function (table) {
      table.string('guest');
    })
  );
};

exports.down = function (knex, Promise) {
  return Promise(
    knex.schema.table('lectures', function (table) {
      table.dropColumn('guest');
    })
  );
};
