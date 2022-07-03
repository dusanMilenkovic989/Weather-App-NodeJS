const express = require('express')
const getGeocode = require('../utilities/geocode')
const getWeather = require('../utilities/forecast')

const routes = new express.Router()

routes.get('', (req, res) => {
    res.render('index', {
        title: 'Weather info',
        name: 'Dusan Milenkovic'
    })
})

routes.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dusan Milenkovic'
    })
})

routes.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dusan Milenkovic',
        message: ''
    })
})

routes.get('/weather', (req, res) => {
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

routes.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Dusan Milenkovic',
        errorMessage: 'Help article not found'
    })
})

routes.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dusan Milenkovic',
        errorMessage: 'Page not found'
    })
})

module.exports = routes