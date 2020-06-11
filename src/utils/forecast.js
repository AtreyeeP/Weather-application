const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f97e9c904dbbe7228809a385c2ff020&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to Weather API!', undefined);        
        } else if(body.error) {
            callback('Unable to find the location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees and it feels like ' + body.current.feelslike + ' degrees outside!');
        }    
    });
}

module.exports = forecast