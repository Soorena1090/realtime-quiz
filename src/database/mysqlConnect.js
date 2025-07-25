const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "S_mhb138488",
    database: "quiz_db"
});

module.exports = pool;

