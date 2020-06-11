const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Atty'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Atty'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Atty',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {})=> {
        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            } 
            res.send({
                address : req.query.address,
                location,
                forecast : forecastData
            })              
        })   
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query);    
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpPageNotFound', {
        title: 'Help',
        name: 'Atty',
        errorMessage: 'Help article not found!!!'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Help',
        name: 'Atty',
        errorMessage: 'Page Not Found!!!'
    })
})

app.listen(port, () => {
    console.log("server is up on the port 3000");
    
})
