const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const journalEntrySchema = new mongoose.Schema({
	content: {
		type: String,
		minlength: 5,
		required: true
	},
	date: Date,
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

journalEntrySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('JournalEntry', journalEntrySchema)