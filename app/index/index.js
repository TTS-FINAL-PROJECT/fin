'use strict'

let express = require('express')
let router = express.Router()

router.get('/', function (req, res) {
  res.render(`${__dirname}/views`)
})

module.exports = router
