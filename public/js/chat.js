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


document.querySelector('#send-location').addEventListener('click', () =>{
	if (!navigator.geolocation){
		return alert('Geolocation is not supported by your browser')
		}

	navigator.geolocation.getCurrentPosition((position) =>{
		const {latitude, longitude} = position.coords
		socket.emit('sendLocation',{latitude, longitude})
		})
	
	})