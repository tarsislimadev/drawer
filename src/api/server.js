const { createServer } = require('http')
const { Server } = require('socket.io')
const express = require('express')
const { PORT } = require('./config')

const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  socket.on('joystick', (j) => socket.broadcast.emit('joystick', j))

  socket.on('message', (message) => socket.broadcast.emit('message', message))
})

httpServer.listen(PORT)
