const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'headsOfStateDB'
const collName = 'headsOfState'

let headsOfStateDB;
let headsOfState;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        headsOfStateDB = client.db(dbName);
        headsOfState = headsOfStateDB.collection(collName);
    }).catch((error) => {
        console.log(error);
    })
// getting the heads of state
var getHeadsOfState = function () {
    return new Promise((resolve, reject) => {
        var cursor = headsOfState.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// this is for adding to the head of state
let addHeadToStateDB = function (_id, headOfState) {
    return new Promise((resolve, reject) => {
        headsOfState.insertOne({ "_id": id, "headOfState": headOfState })
            .then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
    })
}

module.exports = { getHeadsOfState, addHeadToStateDB }