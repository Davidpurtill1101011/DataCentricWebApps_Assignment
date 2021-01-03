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

// deleteing the country that has no cities
var deleteCountry = function (co_code) {
    return new Promise((resolve, reject) => {
        let delQuery = {
            sql: 'DELETE from country WHERE co_code = ?',
            values: [co_code]
        }
        pool.query(delQuery)
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { deleteCountry }