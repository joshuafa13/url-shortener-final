const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Url = require('./models/url')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener-final'
const PORT = process.env.PORT || 3000

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const db = mongoose.connection

db.on('error', () => console.log('mongodb error'))

db.once('open', () => console.log('mongodb connected'))

app.get('/', (req, res) => {
	Url.find()
		.lean()
		.then(urls => res.render('index', { urls }))
})

app.post('/generate', (req, res) => {
	const full = req.body.fullUrl
	return Url.create({ full: full }).then(() => res.redirect('/'))
})

app.get('/:shortUrl', (req, res) => {
	const shortUrl = req.params.shortUrl
	Url.findOne({ short: shortUrl })
		.lean()
		.then(url => res.redirect(url.full))
})

app.delete('/:id', (req, res) => {
	const id = req.params.id
	Url.findById(id)
		.then(url => url.remove())
		.then(() => res.redirect('/'))
})

app.listen(PORT, () => console.log(`Express listening on port: ${PORT}`))
