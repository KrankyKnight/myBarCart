const mysql = require('mysql2/promise');
const envPath = process.env.NODE_ENV === 'production' ? '.env.local' : '.env.local.test'
require('dotenv').config({path: [envPath]});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: false,
  idleTimeout: 10000,
});

module.exports = {
  test: async () => {
    return await pool.getConnection()
      .then((connection) => {
        connection.release();
        return ['Online', null];
      })
      .catch((err) => ['Offline', err]);
  },
  query: async (query) => {
    return await pool.getConnection()
      .then(async (connection) => {
        console.log('connection retreived');
        const result = await connection.query(query)
          .catch(err => {
            connection.release();
            return new Error(err);
          });
        connection.release();
        console.log('data retreived');
        return result;
      })
      .catch(err => {
        return new Error(err);
      })
  }
};