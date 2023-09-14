
const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

morgan.token('body', req => JSON.stringify(req.body));
require('dotenv').config();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const Person = require('./models/person');

/* Let persons =[
   {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]
*/

app.post('/api/persons', (request, response, next) => {
	const {body} = request;

	if (!body.name) {
		return response.status(400).json({
			error: 'Name is missing',
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: 'Number is missing',
		});
	}

	if (!body.name && !body.number) {
		return response.status(400).json({
			error: 'Name and number are missing',
		});
	}

	Person.find({}).then(persons => {
		console.log('persons: ', persons);

		if (persons.some(person => person.name === body.name)) {
			return response.status(400).json({
				error: 'Name must be unique',
			});
		}

		const newPerson = new Person({
			name: body.name,
			number: body.number,
		});

		newPerson.save()
			.then(savedPerson => {
				response.json(savedPerson);
			})
			.catch(error => {
				next(error);
			});
	});
});

app.get('/', (request, response) => {
	response.send('<h2>Welcome to my phonebook app!</h2>');
});

app.get('/info', (request, response, next) => {
	Person.countDocuments()
		.then(count => {
			const gmtDateTime = new Date().toLocaleString({timeZone: 'America/New_York'});
			response.send('Phonebook has info for ' + count + ' person/s <br> <br>' + gmtDateTime + ' GMT-0500 EST (Eastern Standard Time)');
		})
		.catch(error => {
			next(error);
		});
});

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons);
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(note => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch(error => {
			next(error);
		});
});

app.delete('/api/persons/:id', (request, response, next) => {
	Person.deleteOne({_id: request.params.id})
		.then(() => {
			response.status(204).send('Information deleted successfully').end();
		})
		.catch(error => {
			next(error);
		});
});

app.put('/api/persons/:id', (request, response, next) => {
	const {body} = request;
	const person = {
		number: body.number,
	};

	Person.findByIdAndUpdate(request.params.id, person, {new: true})
		.then(updatedPerson => {
			response.json(updatedPerson);
		})
		.catch(error => {
			next(error);
		});
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'Unknown endpoint'});
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.log('errorHandler called');

	if (error.name === 'CastError') {
		return response.status(400).send({error: 'malformatted id'});
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({error: error.message});
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
