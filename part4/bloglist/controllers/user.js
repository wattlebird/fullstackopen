const bcrypt = require('bcrypt');
const UserApiRouter = require('express').Router();
const UserModel = require('../models/user');

UserApiRouter.post('/', async (request, response) => {
  if (!request.body || !request.body.password) {
    response.status(400).send('Bad request').end();
    return;
  }

  if (request.body.password.length < 3) {
    response.status(400).send('Password too short').end();
    return;
  }

  const cryptedpwd = await bcrypt.hash(request.body.password, 10);
  const user = UserModel({
    ...request.body,
    password: cryptedpwd,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

UserApiRouter.get('/', async (req, res) => {
  const users = await UserModel.find({}).populate('blog');
  res.status(200).json(users);
});

module.exports = UserApiRouter;
