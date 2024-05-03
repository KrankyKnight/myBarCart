const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: false
});

module.exports = {
  test: async () => {
    return await pool.getConnection()
      .then(() => ['Online', null])
      .catch((err) => ['Offline', err]);
  },
  query: async (query) => {
    return await pool.getConnection()
      .then(async (connection) => {
        console.log('connection retreived');
        const result = await connection.query(query);
        connection.release();
        console.log('data retreived');
        return result;
      })
      .catch(err => {
        return new Error(err);
      })
  }
};