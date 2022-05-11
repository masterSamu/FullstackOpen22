const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    if (!blog.likes) blog.likes = 0;
    blog.save().then((result) => {
      response.status(201).json(result);
    });
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.status(204).json(updatedBlog);
});

module.exports = blogsRouter;
