// Define Modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Init app express
const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup Route for /
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ibrahim Khalid'
    })
})

// Setup Route for About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ibrahim Khalid'
    })
})

// Setup Route for Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ibrahim Khalid',
        helpText: 'This is a help message.'
    })
})

//Setup Route for Weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    //Second param is destructuring from Data Object
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

// Setup Route for Help Article
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ibrahim Khalid',
        errorMessage: 'Help article not found.'
    })
})

// Setup Route for 404 Page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ibrahim Khalid',
        errorMessage: 'Page not found.'
    })
})

//Start the app on 3000
app.listen(3000, () => {
    console.log('Server started on port 3000')
})