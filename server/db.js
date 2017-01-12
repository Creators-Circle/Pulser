// js file for connecting to the database
let pg = require('pg');
pg.defaults.ssl = true;

let db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'followme'
});

module.exports = db;
