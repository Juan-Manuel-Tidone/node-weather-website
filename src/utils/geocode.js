const request = require('request')

//Get lat and long from a particular search text
const geocode =(address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoiam10aWRvbmUiLCJhIjoiY2p2Zm44dXpwMTBnYzN5cDZ6OWtiOWVoNSJ9.V5TX-OfCS6ukO-kO9n73SQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
  }

  module.exports = geocode