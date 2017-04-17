'use strict'
let path = require('path')
let defaults = Object.seal({
  whiteList: [],
  applicationPath: './app',
  homeDirectory: 'index'
})

function* applyRoutes (list) {
  for (let item of list) {
    yield item
  }
}

function loadApp (express, callback) {
  return new Promise((resolve, reject) => {
    try {
      let settings = this.config
      for (let appModule of applyRoutes(settings.whiteList)) {
        let resolvedPath = path.resolve(path.dirname(module.parent.filename), settings.applicationPath, appModule)
        express.use(`/${appModule.replace(settings.homeDirectory, '')}`, require(resolvedPath))
      }
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

function Xploader (config) {
  this.config = Object.assign(defaults, config)
  return loadApp.bind(this)
}

module.exports = Xploader
