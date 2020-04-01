const router = require('express').Router()
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
	await JournalEntry.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()
})

module.exports = router
