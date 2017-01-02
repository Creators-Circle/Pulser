// js file for connecting to the database
var pg = require('pg');
pg.defaults.ssl = true;

var db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'followme'
});

module.exports = db;
