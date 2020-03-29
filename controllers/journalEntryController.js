const journalEntriesRouter = require('express').Router()
const JournalEntry = require('../models/journalEntry')

journalEntriesRouter.get('/', (request, response) => {
	JournalEntry.find({}).then(entries => {
		response.json(entries.map(entry => entry.toJSON()))
	})
})

journalEntriesRouter.get('/:id', (request, response, next) => {
	JournalEntry.findById(request.params.id)
		.then(entry => {
			if (entry) {
				response.json(entry.toJSON())
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

journalEntriesRouter.post('/', (request, response, next) => {
	const body = request.body

	const journalEntry = new JournalEntry({
		content: body.content,
		important: body.important || false,
		date: new Date()
	})

	journalEntry.save()
		.then(savedEntry => {
			response.json(savedEntry.toJSON())
		})
		.catch(error => next(error))
})

journalEntriesRouter.delete('/:id', (request, response, next) => {
	JournalEntry.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

journalEntriesRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const journalEntry = {
		content: body.content,
		important: body.important,
	}

	JournalEntry.findByIdAndUpdate(request.params.id, journalEntry, { new: true })
		.then(updatedEntry => {
			response.json(updatedEntry.toJSON())
		})
		.catch(error => next(error))
})

module.exports = journalEntriesRouter