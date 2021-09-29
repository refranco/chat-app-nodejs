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

// -------- generando contador -----------------
socket.on('counter', (count)=>{
	console.log('the counter is in ',count)
})

document.querySelector('#counter').addEventListener('click', ()=>{
	socket.emit('countIncrement')
})