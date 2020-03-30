const journalEntriesRouter = require('express').Router()
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

journalEntriesRouter.get('/', async (request, response) => {
	const entries = await JournalEntry.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(entries.map(entry => entry.toJSON()))
})

journalEntriesRouter.get('/:id', async (request, response) => {
	const entry = await JournalEntry.findById(request.params.id)
	if (entry) {
		response.json(entry.toJSON())
	} else {
		response.status(404).end()
	}
})

journalEntriesRouter.post('/', async (request, response) => {
	const body = request.body

	const user = await User.findById(body.userId)

	const journalEntry = new JournalEntry({
		content: body.content,
		important: body.important || false,
		date: new Date(),
		user: user._id
	})

	const savedEntry = await journalEntry.save()
	user.entries = user.entries.concat(savedEntry._id)
	await user.save()

	response.json(savedEntry.toJSON())
})

journalEntriesRouter.delete('/:id', async (request, response) => {
	await JournalEntry.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

journalEntriesRouter.put('/:id', async (request, response) => {
	const body = request.body

	const journalEntry = {
		content: body.content,
		important: body.important,
	}

	const updatedEntry = await JournalEntry.findByIdAndUpdate(request.params.id, journalEntry, { new: true })
	response.json(updatedEntry.toJSON())
})

module.exports = journalEntriesRouter