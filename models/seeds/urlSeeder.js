const mongoose = require('mongoose')
const Url = require('../url')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener-final'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error'))

db.once('open', () => {
	console.log('mongoose connected')
	Url.create({
		full: 'https://www.google.com',
	}).then(() => db.close())
	console.log('done')
})
