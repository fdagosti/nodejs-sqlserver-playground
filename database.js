const sql = require('mssql')
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  trustServerCertificate: true
}

// run a query against the global connection pool
module.exports.runQuery = (query) => {
    // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
    return sql.connect(sqlConfig).then(pool => pool.query(query))
  }