'use strict'

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const routes = require('./routes/routes')

const app = express()
const port = process.env.PORT || 3000

// Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup for Handlebars engine and views location
app.set('view engine', 'hbs')                               
app.set('views', viewsPath)                                 
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(routes)

app.listen(port, () => {
    console.log(`Server is up on port: ${port}!`)
})