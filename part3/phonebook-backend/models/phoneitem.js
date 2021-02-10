/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    console.log('connected to MongoDB');
  }).catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phoneitemSchema = new mongoose.Schema({
  name: {
    type: String, required: true, unique: true, minLength: 3,
  },
  number: { type: String, required: true, minLength: 8 },
});

phoneitemSchema.plugin(uniqueValidator);

phoneitemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PhoneItem = mongoose.model('PhoneItem', phoneitemSchema);

module.exports = PhoneItem;
