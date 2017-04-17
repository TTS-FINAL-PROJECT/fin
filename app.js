'use strict'

let express = require('express')
let io = require('./lib/sockets')
let gzip = require('compression')
let logger = require('morgan')
let path = require('path')
let moment = require('moment')
let config = require('./lib/config')
let modWhiteList = require('./lib/config').modules
let Loader = require('./lib/appLoader')
let loader = new Loader({
  whiteList: modWhiteList
})
let server

// start app
let app = express()

// global helpers
app.locals.moment = moment

// view engine setup
app.set('views', path.join(__dirname, '/app'))
app.set('view engine', 'pug')

// middleware
app.use(gzip())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// set routing
loader(app).then(function () {
  // start server
  server = require('http').Server(app)
  io(server)
  server.listen(config.port)
})
