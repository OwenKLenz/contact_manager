const pgp = require('pg-promise')();
const connectionString  = "postgresql://oklenz:ThisIsAPassword@localhost:5432/contacts";

const db = pgp(connectionString);

module.exports = db;
