const socket = io()

// elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#send-location')

// --------- enviando mensajes de texto
$messageForm.addEventListener('submit', (event) =>{
	event.preventDefault() // previene que no se borre el mensaje antes de

	// deshabilitar el form mientras envio mensaje
	$messageFormButton.setAttribute('disabled','disabled')

	const msg = event.target.elements.message.value
	socket.emit('sendMessage', msg, (error) =>{
	
	$messageFormButton.removeAttribute('disabled') // habilitando form nuevamente
	$messageFormInput.value = ''
	$messageFormInput.focus()
		if (error) {
			return console.log(error)
		}
		console.log('message delivered')
	})

})

socket.on('message',(message)=>{
	console.log(message)
})

// -------------- enviando coordenadas de localizacion ------------
$sendLocation.addEventListener('click', () =>{
	if (!navigator.geolocation){
		return alert('Geolocation is not supported by your browser')
		}

	// deshabilitar boton
	$sendLocation.setAttribute('disabled','disabled')

	navigator.geolocation.getCurrentPosition((position) =>{
		const {latitude, longitude} = position.coords
		socket.emit('sendLocation',{latitude, longitude},() =>{
			console.log('location shared!')
		// habilitar boton nuevamente
		$sendLocation.removeAttribute('disabled')
		})
		})
	
	})