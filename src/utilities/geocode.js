'use strict'

const request = require('request')

const getGeocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZHVzYW5taWxlbmtvdmljOTg5IiwiYSI6ImNrcmM2ejQ4YTBpYWYyb3BldnN4b2JxMGgifQ.fjw96TF0MA99pim50BdVkA&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services and check for weather information!')
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try again with different search term.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
})
}

module.exports = getGeocode