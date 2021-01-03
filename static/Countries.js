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
// pulling all the countries from the database
var getCountries = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from country')
            .then((result) => {
                console.log(result)
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getCountries }