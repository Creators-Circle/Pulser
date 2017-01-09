
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('thumbs', function (table) {
      table.dropColumn('lecture_id');
    }),
    knex.schema.createTable('topics', function (table) {
      table.string('id').primary();
      table.string('topic');
      table.string('lecture_id').references('id').inTable('lectures');
    }),
    knex.schema.table('thumbs', function (table) {
      table.string('topic_id').references('id').inTable('topics');
      table.integer('type');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('thumbs', function (table) {
      table.string('lecture_id');
    }),
    knex.schema.dropTable('topics'),
    knex.schema.table('thumbs', function (table) {
      table.dropColumn('topic_id');
      table.dropColumn('type');
    })
  ]);
};
