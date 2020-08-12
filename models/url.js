const mongoose = require('mongoose')
const randomString = require('randomstring')

const urlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
	},
	short: {
		type: String,
		required: true,
		default: () => randomString.generate(5),
	},
})

module.exports = mongoose.model('Url', urlSchema)
