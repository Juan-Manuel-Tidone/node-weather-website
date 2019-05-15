const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Juan Tidone'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Juan Tidone'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Juan Tidone'
    })
})

/* Static pages
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name:'Andrew'
        
    },{
        name:'Sarah'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})
*/

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
           error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//API that get the search term from query string parameters and return the weather using geocode.js and forecast.js
//It's called in the js/app.js --> fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
           error: 'You must provide aa address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            } 
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
      })

    /*
    res.send({
        forecast:'Snowing',
        location:'Philadelphia',
        address: req.query.address
    })
    */
})


// app.com
// app.com/help

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Juan Tidone',
        errorMessage:'Article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Juan Tidone',
        errorMessage:'Page not found'
    })
})

app.listen(3000, ()  =>{
    console.log('Server is up in port 3000')
})