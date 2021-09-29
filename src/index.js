const path = require('path')
const http = require('http') // **** websocket configutation line
const express = require('express')
const socketio = require('socket.io') // **** websocket configutation line

const app = express()  
const server = http.createServer(app) // **** websocket configutation line, pass the server app to an http.server
const io = socketio(server) // **** websocket configutation line, setting up socket io to work with a given server

const port = process.env.PORT || 3000
// define paths for express library
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')


//setup static directory 
app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) =>{
// --------- enviando mensajes de texto
	console.log('New WebSocket connection')
	socket.emit('message','Welcome back!')

	socket.on('sendMessage', (msg) =>{
		io.emit('message',msg)
	})

	socket.broadcast.emit('message','A new user has joined!')

	socket.on('disconnect', () =>{
		io.emit('message','A user has left')
	})
})

server.listen(port, () =>{ // **** websocket configutation line
	console.log('server is up and running on port '+port)
})