require('dotenv').config();
const pgp = require('pg-promise')();
const connectionString  = `postgresql://oklenz:${process.env.POSTGRES_PASS}@localhost:5432/contacts`;
const db = pgp(connectionString);

module.exports = db;
