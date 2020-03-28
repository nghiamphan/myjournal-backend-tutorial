const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

let journalEntries = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2019-05-30T17:30:31.098Z",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2019-05-30T18:39:34.091Z",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2019-05-30T19:20:14.298Z",
		important: true
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/journalEntries', (req, res) => {
	res.json(journalEntries)
})

app.get('/api/journalEntries/:id', (request, response) => {
	const id = Number(request.params.id)
	const journalEntry = journalEntries.find(entry => entry.id === id)

	if (journalEntry) {
		response.json(journalEntry)
	} else {
		response.status(404).end()
	}
})

const generatedId = () => {
	const maxId = journalEntries.length > 0
		? Math.max(...journalEntries.map(n => n.id))
		: 0
		return maxId + 1
}

app.post('/api/journalEntries', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const journalEntry = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generatedId(),
	}

	journalEntries = journalEntries.concat(journalEntry)

	response.json(journalEntry)
})

app.delete('/api/journalEntries/:id', (request, response) => {
	const id = Number(request.params.id)
	journalEntries = journalEntries.filter(entry => entry.id !== id)

	response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})