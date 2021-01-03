var mysql = require('promise-mysql');
var pool;

// creating the pool for the sql db
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'geography'
})
    .then((result) => {
        pool = result;
    })
    .catch((error) => {
        console.log(error);
    });

// to edit a country information
var editCountriesDB = function (code, name, description) {
    return new Promise((resolve, reject) => {
        var editQuery = {
            sql: 'INSERT INTO country (co_code, co_name, co_details) VALUES (?,?,?)',
            values: [code, name, description]
        }
        pool.query(editQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { editCountriesDB }