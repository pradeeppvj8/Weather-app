const request = require('request')

const geocode = (address, callback) => {

    const mapBoxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicHJhZGVlcHB2aiIsImEiOiJja2Jocjk5MXowODVnMnlwN2p0d3AwNHdpIn0.8v2I8nkTt_DtYxpukcoP3A"

    request({ url: mapBoxUrl, json: true }, (error, response) => {

        if (error) { // Low level error ex :- No network
            callback('Could not connect to map box', undefined)
        } else if (response.body.features.length === 0) { // User entered data wrong, hence empty response
            callback('Could not find valid latitude and longitude for the given address')
        } else { // If everything is fine
            callback(undefined, {
                'latitude': response.body.features[0].center[0],
                'longitude': response.body.features[0].center[1],
                'location': response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
