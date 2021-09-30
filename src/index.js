const path = require('path')
const http = require('http') // **** websocket configutation line
const Filter = require('bad-words')
const express = require('express')
const socketio = require('socket.io') // **** websocket configutation line
const {generateMessage, generateLocationMessage} = require('./utils/messages')

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

	socket.on('join', ({ username, room }) =>{
		socket.join(room)

		socket.emit('message',generateMessage('Welcome back!'))
		socket.broadcast.to(room).emit('message',generateMessage(`${username} has joined!`))

	})
	


	socket.on('sendMessage', (msg, callback) =>{
		const filter = new Filter()

		if (filter.isProfane(msg)){
			return callback('Profanity is not allowed')
		}

		io.to('Medellin').emit('message',generateMessage(msg))
		callback()

	})

	

	socket.on('sendLocation', (location, cb) =>{
		io.emit('locationMessage',
		generateLocationMessage(`https://www.google.com/maps/@${location.longitude},${location.latitude}`))
		cb()
	})

	socket.on('disconnect', () =>{
		io.emit('message',generateMessage('A user has left'))
	})
})

server.listen(port, () =>{ // **** websocket configutation line
	console.log('server is up and running on port '+port)
})