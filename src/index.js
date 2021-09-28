const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// define paths for express library
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')

//setup handlebars engine and views location
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', viewsPath)  // customize views folder
hbs.registerPartials(partialPath)

//setup static directory 
app.use(express.static(publicDirectory))

// app.get('/', (req,res) =>{
// 	res.render('index',{})
// })

app.listen(port, () =>{
	console.log('server is up and running on port '+port)
})

