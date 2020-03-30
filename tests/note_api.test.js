const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const JournalEntry = require('../models/journalEntry')
const User = require('../models/user')

beforeEach(async () => {
	await JournalEntry.deleteMany({})

	const entryObjects = helper.initialEntries
		.map(entry => new JournalEntry(entry))
	const promiseArray = entryObjects.map(entry => entry.save())
	await Promise.all(promiseArray)
})

describe('when there is initially some entries saved', () => {
	test('journal entries are returned as json', async () => {
		await api
			.get('/api/journalEntries')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all entries are returned', async () => {
		const response = await api.get('/api/journalEntries')

		expect(response.body).toHaveLength(helper.initialEntries.length)
	})

	test('a specific entry is within the returned entries', async () => {
		const response = await api.get('/api/journalEntries')

		const contents = response.body.map(r => r.content)

		expect(contents).toContain('Browser can execute only Javascript')
	})

	describe('viewing a specific entry', () => {
		test('succeeds with a valid id', async () => {
			const entriesAtStart = await helper.entriesInDb()

			const entryToView = entriesAtStart[0]

			const resultEntry = await api
				.get(`/api/journalEntries/${entryToView.id}`)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(resultEntry.body).toEqual(entryToView)
		})

		test('fails with statuscode 404 if entry does not exist', async () => {
			const validNonexistingId = await helper.nonExistingId()

			console.log(validNonexistingId)

			await api
				.get(`/api/journalEntries/${validNonexistingId}`)
				.expect(404)
		})

		test('fails with statuscode 400 id is invalid', async () => {
			const invalidId = '5a3d5da59070081a82a3445'

			await api
				.get(`/api/journalEntries/${invalidId}`)
				.expect(400)
		})
	})

	describe('addition of a new entry', () => {
		test('succeeds with valid data', async () => {
			const newEntry = {
				content: 'async/await simplifies making async calls',
				important: true,
			}

			await api
				.post('/api/journalEntries')
				.send(newEntry)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const entriesAtEnd = await helper.entriesInDb()
			expect(entriesAtEnd).toHaveLength(helper.initialEntries.length + 1)

			const contents = entriesAtEnd.map(r => r.content)
			expect(contents).toContain(
				'async/await simplifies making async calls'
			)
		})

		test('fails with status code 400 if data invaild', async () => {
			const newEntry = {
				important: true
			}

			await api
				.post('/api/journalEntries')
				.send(newEntry)
				.expect(400)

			const entriesAtEnd = await helper.entriesInDb()
			expect(entriesAtEnd).toHaveLength(helper.initialEntries.length)
		})
	})


	describe('deletion of a entry', () => {
		test('succeeds with status code 204 if id is valid', async () => {
			const entriesAtStart = await helper.entriesInDb()
			const entryToDelete = entriesAtStart[0]

			await api
				.delete(`/api/journalEntries/${entryToDelete.id}`)
				.expect(204)

			const entriesAtEnd = await helper.entriesInDb()

			expect(entriesAtEnd).toHaveLength(
				helper.initialEntries.length - 1
			)

			const contents = entriesAtEnd.map(r => r.content)

			expect(contents).not.toContain(entryToDelete.content)
		})
	})
})

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('root', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'nphan',
			name: 'Nghia',
			password: 'nphan',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'root',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})