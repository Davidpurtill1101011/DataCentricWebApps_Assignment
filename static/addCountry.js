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
// adding a country
// this gives an error from the index page
// counldnt find where i went wrong
let addCountry = function (co_code, co_name, co_details) {
    return new Promise((resolve, reject) => {
        pool.query('insert into country VALUES("' + co_code + '","' + co_name + '","' + co_details + '")')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { addCountry }