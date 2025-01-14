const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
	heading: {
		type: String,
		required: true,
		minLength: 2
	},
	author: {
		type: String,
		required: true,
		minLength: 2
	},
	release: {
		type: Number,
		required: true,
	}
})

module.exports = mongoose.model('book', bookSchema)