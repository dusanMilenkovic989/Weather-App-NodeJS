'use strict'

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeocode = require('./utilities/geocode')
const getWeather = require('./utilities/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup for Handlebars engine and views location
app.set('view engine', 'hbs')                               
app.set('views', viewsPath)                                 
hbs.registerPartials(partialsPath)

// Setup for serving directory with static data
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather info',
        name: 'Dusan Milenkovic'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dusan Milenkovic'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dusan Milenkovic',
        message: 'Whatever you need just give us a call'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please provide a location for the weather forecast.'
        })
    }

    if (typeof req.query.location === 'string') {
        getGeocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } 
            
            getWeather(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error
                    })
                } 
                
                res.send({
                    location,
                    forecast: data
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Dusan Milenkovic',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dusan Milenkovic',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}!`)
})