const socket = io()

// --------- enviando mensajes de texto
document.querySelector("#message-form").addEventListener('submit', (event) =>{
	event.preventDefault()
	const msg = event.target.elements.message.value
	socket.emit('sendMessage', msg)

})

socket.on('message',(message)=>{
	console.log(message)
})
