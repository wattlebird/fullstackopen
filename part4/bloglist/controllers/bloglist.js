const jwt = require('jsonwebtoken')
const BlogApiRouter = require('express').Router();
const BlogModel = require('../models/blog');
const UserModel = require('../models/user')

BlogApiRouter.get('/', (request, response) => {
  BlogModel
    .find({})
    .populate('user')
    .then((blogs) => {
      response.json(blogs);
    });
});

BlogApiRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).send('Bad request').end();
    return;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    response.status(401)
      .json({
        error: 'token missing or invalid',
      });
    return;
  }
  const user = await UserModel.findById(decodedToken.id);

  if (!request.body.likes) {
    request.body = {
      ...request.body,
      likes: 0,
    };
  }

  const blog = new BlogModel({
    ...request.body,
    user: user._id
  });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

BlogApiRouter.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      error: 'Blog id must be provided.',
    });
    return;
  }
  const id = String(req.params.id);
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    req.status(401)
      .json({
        error: 'token missing or invalid',
      });
    return;
  }

  const blogToDelete = await BlogModel.findById(id);
  if (blogToDelete.user.toString() !== decodedToken.id) {
    res.status(401)
      .json({
        error: 'Permission denied',
      });
    return;
  }
  await blogToDelete.delete();
  res.status(204).end();
});

BlogApiRouter.put('/:id', async (req, res) => {
  const id = String(req.params.id);
  if (!req.body) {
    res.status(400).end();
    return;
  }
  const newblog = await BlogModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(newblog);
});

module.exports = BlogApiRouter;
