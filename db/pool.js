const {Pool} = require('pg');
require('dotenv').config();

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: process.env.PG_HOST, // or wherever the db is hosted
  user: process.env.PG_USER,
  database: process.env.PG_NAME,
  port: process.env.PG_PORT, // The default port
  password: process.env.PG_PASSWORD
});
