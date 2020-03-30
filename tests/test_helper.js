const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

const initialEntries = [
	{
		content: 'HTML is easy',
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		important: true,
	},
]

const nonExistingId = async () => {
	const entry = new JournalEntry({ content: 'willremovethissoon' })
	await entry.save()
	await entry.remove()

	return entry._id.toString()
}

const entriesInDb = async () => {
	const entries = await JournalEntry.find({})
	return entries.map(entry => entry.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialEntries, nonExistingId, entriesInDb, usersInDb
}