const mongoose = require('mongoose');

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv.length > 3 && process.argv[3];
const number = process.argv.length > 3 && process.argv[4];

const url = `mongodb+srv://ronwa:${password}@cluster0.r3hsu.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

const phoneitemSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneItem = mongoose.model('PhoneItem', phoneitemSchema);

if (process.argv.length > 3) {
  const phoneitem = new PhoneItem({
    name,
    number,
  });

  phoneitem.save().then((result) => {
    console.log('Phonebook item saved!');
    mongoose.connection.close();
  });
} else {
  PhoneItem.find().then((people) => {
    console.log('phonebook:');
    people.forEach((people) => {
      console.log(people.name, people.number);
    });
    mongoose.connection.close();
  });
}
