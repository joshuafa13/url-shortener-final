const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener-final'
const bodyParser = require('body-parser')

const Url = require('./models/url')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error'))

db.once('open', () => console.log('mongodb connected'))

const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	Url.find()
		.lean()
		.then(urls => res.render('index', { urls }))
})

app.post('/generate', (req, res) => {
	const full = req.body.fullUrl
	return Url.create({ full: full }).then(() => res.redirect('/'))
})

app.post('/delete', (req, res) => {
	res.redirect('/')
})

app.listen(PORT, () => console.log(`Express listening on port: ${PORT}`))
