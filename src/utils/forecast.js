const request = require('request')

//Get current weather from a particular lat and long
const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/b2972d904e35ef35f29f431b57148fd9/'+latitude+','+longitude+'?units=si&lang=es'
    request({url, json:true},(error, {body}) =>{
    if(error)
        {
            callback('Unable to connecto to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)    
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees. There is a ' + body.currently.precipProbability+ '% chance of rain, undefined')      
          }
    })
}

module.exports = forecast