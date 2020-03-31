const jwt = require('jsonwebtoken')
const journalEntriesRouter = require('express').Router()
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

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
	const token = getTokenFrom(request)

	// Note: if token = null, an JsonWebTokenError will be thrown. We already handle it in our errorHandler middleware, so that's good.
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

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