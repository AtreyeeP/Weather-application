const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXRyZXllZXBhdWwiLCJhIjoiY2tiMHBpZW9jMGE3YzJzbzNybjlwa3UyZSJ9.cuO7ne0aI4hYy9qgg8L0xw&limit=1'
    
    request({url, json: true}, (error, { body }) => {
            if(error) {
                callback('Unable to connect to Location API!', undefined)      
            } else if(body.features.length === 0) {
                callback('Unable to find the location!', undefined);
            } else {
                callback(undefined, {
                    longitude : body.features[0].center[0],
                    latitude : body.features[0].center[1],
                    location : body.features[0].place_name
                });
            }    
        });
}

module.exports = geocode
