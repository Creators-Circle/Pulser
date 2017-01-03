// removing presenter_id field inside presentations table
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('presentations', function (table) {
      table.dropColumn('presenter_id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('presentations', function (table) {
      table.string('presenter_id').references('id').inTable('users');
    })
  ]);
};
