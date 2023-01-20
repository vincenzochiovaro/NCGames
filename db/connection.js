const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

// if (!process.env.PGDATABASE) {
//   throw new Error("PGDATABASE not set");
// }
if (
  process.env.PGDATABASE === undefined &&
  process.env.DATABASE_URL === undefined
) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {};

module.exports = new Pool(config);
