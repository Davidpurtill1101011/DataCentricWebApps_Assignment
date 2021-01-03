var express = require('express');
const { check } = require('express-validator');
var mysql = require('promise-mysql');
const MyCountries = require('./static/Countries');
const addCountries = require('./static/addCountry');
const deleteCountries = require('./static/delete');
const showCities = require('./static/cities');
const headsOfState = require('./static/headsOfStates');
let bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');

var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));

//pulling the code from the home.ejs
app.get('/', (req, res) => {
    res.render('home');
})

// localhost for getting the countries 
// and displaying the page.
app.get('/countries', (req, res) => {
    MyCountries.getCountries()
        .then((result) => {
            console.log(result)
            //res.send(result)
            res.render('showCountries', { countries: result })
        }).catch((error) => {
            res.send(error);
        })
})

//getting and displaying the cities.
app.get('/cities', (req, res) => {
    showCities.getCities().then((result) => {
        console.log(result);
        res.render('showCities', { cities: result })
    }).catch((error) => {
        res.send(error);
    })
})

// this is for the city details but i couldnt get it to run
// i deleted the details page for this becasue there was noting 
// been displayed in it.

// app.get('/cityDetails', (req, res) => {
//     showCities.getCities()
//     .then((result) => {
//         console.log(result)
//         res.render('cityDetails', { cities: result })
//     })
//     .catch((error) => {
//         res.send(error);
//     })

//     console.log("in /cityDetails")
// })

// pulling in the ui to add countries.
app.get('/addCountry', (req, res) => {
    res.render('addCountries');
})

//adding a country.
app.post('/addCountry',
    (req, res) => {
        addCountries.addCountry(req.body.code, req.body.name, req.body.description)
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.redirect('Countries')
        } else {
            res.send("NOT Good!!")
        }
    })
//displaying the heads of state
app.get('/headsOfState', (req, res) => {
    headsOfState.getHeadsOfState()
        .then((documents) => {
            res.render('showHeadsOfState', { stateData: documents })
        }).catch((error) => {
            res.send(error)
        })
})
// rendering the head of state ejs page
app.get('/addHeadOfState', (req, res) => {
    res.render('addHeadofState')
})

app.post('/addHeadOfState', (req, res) => {
    headsOfState.addHeadToStateDB(req.body._id, req.body.headOfState)
        .then((result) => {
            res.redirect('headsOfState')
        }).catch((error) => {
            res.send("not ok")
        })
})
// deleteing the country.
app.get('/delete/:code', (req, res) => {
    deleteCountries.deleteCountry(req.params.code)
        .then((result) => {
            res.redirect('/countries');
        }).catch((error) => {
            res.send("This country has a city in the city Database so it cannot be deleted")
        })
});
// the code for the localhost call
app.listen(3000, () => {
    console.log("Listening on port 3000");
})