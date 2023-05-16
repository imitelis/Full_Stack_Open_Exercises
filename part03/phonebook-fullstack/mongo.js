const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Give password as argument');
	process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://dsaavedra:${password}@cluster0.auariy9.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	id: Number,
});

const Person = mongoose.model('persons', personSchema);

if (process.argv.length === 3) {
	Person.find({}).then(result => {
		console.log('phonebook:');
		result.forEach(person => {
			console.log(person.name + ' ' + person.number);
		});
		mongoose.connection.close();
	});
}

if (process.argv.length === 5) {
	const person = new Person({
		name: `${newName}`,
		number: `${newNumber}`,
	});

	person.save().then(() => {
		console.log(`Added ${newName} number ${newNumber} to phonebook`);
		mongoose.connection.close();
	});
}
