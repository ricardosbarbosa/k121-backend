//contants
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const DB_HOST = process.env.DB_HOST;
const DB_HOST_TEST = process.env.DB_HOST_TEST;

module.exports = {
  PORT,
  HOSTNAME,
  DB_HOST,
  DB_HOST_TEST
};