const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/abbf0507f79ce9fbb444e4ea679779b9/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const data = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' degrees with a low of ' + body.daily.data[0].temperatureLow + ' degrees. There is a ' + body.currently.precipProbability  + '% chance of rain.'
            callback(undefined, data)
        }
    })
}

module.exports = forecast