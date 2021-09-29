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

io.on('connection',() =>{
	console.log('new WebSocket connection!')
})

server.listen(port, () =>{ // **** websocket configutation line
	console.log('server is up and running on port '+port)
})

