'use strict'

const postmanRequest = require('postman-request')

const getWeather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1674b7d93f330e493ec8ae84cbe42d08&query=${latitude},${longitude}`

    postmanRequest(url, (error, { body } = {}) => {
        if (error) {
            return console.log('Unable to connect to weather services!')
        }

        const data = JSON.parse(body)

        if (data.error) {
            callback('Unable to find location! Please make sure valid coordinates are provided')
        } else {
            callback(undefined, `${data.current.weather_descriptions[0]}. It's currently ${data.current.temperature} degrees Celsius out. It feels like ${data.current.feelslike} degrees.`)
        }
    })
}

module.exports = getWeather