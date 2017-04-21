'use strict'

let Io = require('socket.io')

let userCount = 0
let messages = []

module.exports = function (server) {
  let io = Io(server)

  io.on('connection', function (socket) {
    userCount += 1
    let userObj = {'currentUser': `PersonFromServer${userCount}`}

    socket.broadcast.emit('join:new', userObj)
    socket.emit('user:in', userObj)

    socket.on('message:new', function (msg) {
      messages.push(msg)
      if (messages.length > 9) {
        messages.shift()
      }
      socket.broadcast.emit('messages', messages)
      socket.emit('messages', messages)
    })
  })

  return io
}
