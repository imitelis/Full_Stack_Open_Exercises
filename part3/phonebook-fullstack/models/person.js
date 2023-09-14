const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('Connecting to', url);

mongoose.connect(url)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(error => {
		console.log('Error connecting to MongoDB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: [true, 'Entry name required'],
		unique: true,
	},
	number: {
		type: String,
		minLength: 8,
		maxLength: 14,
		required: [true, 'Entry phone number required'],
		match: [/^(\d{2}-\d{5,11}|\d{3}-\d{4,10}|\d{8,14})$/],
		unique: false,
	},
});

personSchema.set('toJSON', {
	transform(document, returnedObject) {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('persons', personSchema);
