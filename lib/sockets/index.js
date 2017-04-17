'use strict'

let Io = require('socket.io')

module.exports = function (server) {
  let io = Io(server)

  io.on('connection', function (socket) {
    socket.broadcast.emit('user:in', {'message': 'hello'})
  })

  return io
}
