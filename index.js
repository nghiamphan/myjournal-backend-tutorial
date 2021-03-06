const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
// require('dotenv').config() // to use environment variables
// const express = require('express')
// const cors = require('cors')
// const app = express()
// const JournalEntry = require('./models/journalEntry') //import model

// app.use(express.json())
// app.use(cors())
// app.use(express.static('build'))

// const requestLogger = (request, response, next) => {
// 	console.log('Method:', request.method)
// 	console.log('Path:  ', request.path)
// 	console.log('Body:  ', request.body)
// 	console.log('---')
// 	next()
// }
// app.use(requestLogger)

// app.get('/', (req, res) => {
// 	res.send('<h1>Hello World!</h1>')
// })

// app.get('/api/journalEntries', (request, response, next) => {
// 	JournalEntry.find({})
// 		.then(journalEntries => {
// 			response.json(journalEntries.map(entry => entry.toJSON()))
// 		})
// 		.catch(error => next(error))
// })

// app.get('/api/journalEntries/:id', (request, response, next) => {
// 	JournalEntry.findById(request.params.id)
// 		.then(entry => {
// 			if (entry) {
// 				response.json(entry.toJSON())
// 			} else {
// 				response.status(404).end()
// 			}
// 		})
// 		.catch(error => next(error))
// })

// app.post('/api/journalEntries', (request, response, next) => {
// 	const body = request.body

// 	if (!body.content) {
// 		return response.status(400).json({
// 			error: 'content missing'
// 		})
// 	}

// 	const journalEntry = new JournalEntry({
// 		content: body.content,
// 		important: body.important || false,
// 		date: new Date(),
// 	})

// 	journalEntry.save()
// 		.then(savedEntry => savedEntry.toJSON())
// 		.then(savedAndFormattedEntry => {
// 			response.json(savedAndFormattedEntry)
// 		})
// 		.catch(error => next(error))
// })

// app.put('/api/journalEntries/:id', (request, response, next) => {
// 	const body = request.body

// 	const journalEntry = {
// 		content: body.content,
// 		important: body.important,
// 	}

// 	JournalEntry.findByIdAndUpdate(request.params.id, journalEntry, { new: true })
// 		.then(updatedEntry => {
// 			response.json(updatedEntry.toJSON())
// 		})
// 		.catch(error => next(error))
// })

// app.delete('/api/journalEntries/:id', (request, response, next) => {
// 	JournalEntry.findByIdAndRemove(request.params.id)
// 		// eslint-disable-next-line no-unused-vars
// 		.then(result => {
// 			response.status(204).end()
// 		})
// 		.catch(error => next(error))
// })

// const unknownEndpoint = (request, response) => {
// 	response.status(404).send({ error: 'unknown endpoint' })
// }
// // handler of requests with unknown endpoint
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
// 	console.error('Error:', error.message)

// 	if (error.name === 'CastError' && error.kind === 'ObjectId') {
// 		return response.status(400).send({ error: 'malformatted id' })
// 	} else if (error.name === 'ValidationError') {
// 		return response.status(400).json({ error: error.message })
// 	}

// 	next(error)
// }
// // handler of requests with result to errors
// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`)
// })