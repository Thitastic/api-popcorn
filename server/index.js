require('dotenv').config()
const express = require('express')
const  cors = require('cors')
const bodyParser = require('body-parser')


const App = express()
App.use(bodyParser.json())
App.use(cors())

const path = __dirname +"/public/index.html"
App.use(express.static(path))

const users = require('./api/users')
App.use('/api/users', users) //get user at path api/users

const movies = require('./api/movies')
App.use('/api/movies', movies) //get movie at path api/movies

const resources = require('./api/resources')
App.use('/api/res', resources) //get movie at path api/res

const el = require('./api/el')
App.use('/api/web', el) //get web element at path api/web

const genres = require('./api/genres')
App.use('/api/genre', genres) //get web element at path api/genre

const eposide = require('./api/eposides')
App.use('/api/ep', eposide) //get eposide at path api/ep




const port = process.env.WEB_PORT || 8080

App.listen(port, ()=>{
    console.log('Your app is listened at localhost:' + port)
})