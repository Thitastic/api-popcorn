const express = require('express')
const  cors = require('cors')
const bodyParser = require('body-parser')


const App = express()
App.use(bodyParser.json())

App.use(cors())

const path = __dirname +"./public/index.html"
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

const sms = require('./api/sms')
App.use('/api/sms', sms) //send sms

const gallery = require('./api/gallery')
App.use('/api/gallery', gallery) //send sms


App.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, App.settings.env);
});