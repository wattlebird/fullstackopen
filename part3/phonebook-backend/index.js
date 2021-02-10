require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
// const cors = require('cors')
const PhoneItemModel = require('./models/phoneitem');

const app = express();

// app.use(cors())

morgan.token('content', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body);
  return '';
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));

app.get('/api/persons', (req, res) => {
  PhoneItemModel.find().then((people) => {
    res.json(people);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  PhoneItemModel.findById(String(req.params.id)).then((person) => {
    if (!person) {
      res.status(404).end();
    } else {
      res.json(person);
    }
  }).catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  PhoneItemModel.findByIdAndDelete(String(req.params.id)).then((rst) => {
    if (rst) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  }).catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: 'empty request' });
  } if (!req.body.name || !req.body.number) {
    return res.status(400).send({ error: 'Name or number not provided.' });
  }
  const item = new PhoneItemModel({
    name: req.body.name,
    number: req.body.number,
  });
  return item.save().then((savedItem) => {
    res.json(savedItem);
  }).catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: 'empty request' });
  } if (!req.body.name || !req.body.number) {
    return res.status(400).send({ error: 'Name or number not provided.' });
  }
  return PhoneItemModel.findByIdAndUpdate(String(req.params.id), {
    name: req.body.name,
    number: req.body.number,
  }, { new: true, runValidators: true }).then((updatedItem) => {
    res.json(updatedItem);
  }).catch((err) => next(err));
});

app.get('/info', (req, res) => {
  PhoneItemModel.count().then((cnt) => {
    res.send(`The phonebook has ${cnt} people.\n${new Date()}`);
  });
});

// unknown endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// catch handler
const errorHandler = (error, request, response, next) => {
  // console.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  return next(error);
};
app.use(errorHandler);

app.listen(process.env.PORT);
