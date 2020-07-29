const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/Geocode')

const app = express()

const port = process.env.PORT || 3000

// Directory paths
const publicDir = path.join(__dirname, "../public")
const viewDir = path.join(__dirname, "../templates/views")
const partialsDir = path.join(__dirname, "../templates/partials")

// Hbs configuration
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

// Staticly served directory config
app.use(express.static(publicDir))

app.get('', (req, res) => {

    res.render('index', {
        headerTitle: 'Index title',
        developerName: 'Pradeep.P'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        headerTitle: 'Help title',
        developerName: 'Pradeep.P'
    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        headerTitle: 'About title',
        developerName: 'Pradeep.P'
    })

})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            "Error": "Please provide address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    
        if (error) {
            return res.send({
                "Error": error
            })
        }

        return res.send({
            "latitude": latitude,
            "Longitude": longitude,
            "Location": location
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        developerName: "Pradeep.P",
        headerTitle: "404 Page"
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        errorMessage: "Page Not Found",
        developerName: "Pradeep.P",
        headerTitle: "404 Page"
    })
})

app.listen(port, () => {
    console.log("Server listening in port " + port)
})
