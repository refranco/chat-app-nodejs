const socket = io()

// Elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocation = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messagTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// QS ---- trabajando con querys -------------
const {username, room} = Qs.parse(location.search,{ignoreQueryPrefix: true})


// --------- escuchando los mensajes del cliente
$messageForm.addEventListener('submit', (event) =>{
	event.preventDefault() // previene que no se borre el mensaje antes de

	// deshabilitar el form mientras envio mensaje
	$messageFormButton.setAttribute('disabled','disabled')
	
	// enviando mensaje al servidor
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

	const html = Mustache.render(messagTemplate, {
		message:message.text,
		createdAt:moment(message.createdAt).format('h:mm a')
	})
	$messages.insertAdjacentHTML('beforeend', html)
})

// -------------- enviando coordenadas de localizacion (CLIENTE)------------
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

socket.on('locationMessage', (loc) =>{
	console.log(loc)
	const html = Mustache.render(locationTemplate, {
		location: loc.url,
		createdAt: moment(loc.createdAt).format('h:mm a')
	})
	$messages.insertAdjacentHTML('beforeend',html)
})

socket.emit('join',{ username, room })