const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: '195.238.180.33',
    port: 33060,
    user: 'admin',
    password: 'Password',
    database: 'crux_db',
};

const pool = mysql.createPool(config);

const query = async(sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
        if (err) {
            console.log('Error running sql: ' + sql)
            console.log(err)
            reject(err)
        } else {
            resolve(result)
        }
    })
})

module.exports = query;

