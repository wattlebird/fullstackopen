const BlogApiRouter = require('express').Router();
const BlogModel = require('../models/blog');

BlogApiRouter.get('/', (request, response) => {
  BlogModel
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

BlogApiRouter.post('/', (request, response) => {
  const blog = new BlogModel(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

module.exports = BlogApiRouter;
