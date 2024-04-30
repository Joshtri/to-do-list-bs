const mysql = require('mysql2/promise.js');
require('dotenv').config();
//config database
const config = async()=>{
const db = await mysql.createConnection({
    host :  process.env.DB_HOST,
    user :  process.env.DB_USERNAME,
    database :  process.env.DB_NAME,
    password:  process.env.DB_PASSWORD,
    // port : process.env.DB_PORT
});

await db.connect()

return db
}

module.exports = config;