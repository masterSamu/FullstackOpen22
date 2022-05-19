const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");
const { update } = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url,
    user: user._id,
  });

  if (!blog.title) {
    return response.status(400).json({ error: "invalid title" }).end();
  }
  if (!blog.url) {
    return response.status(400).json({ error: "invalid url" }).end();
  }

  if (!blog.likes) blog.likes = 0;

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;
  const blog = await Blog.findById(blogId);

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blogId);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: "Unauthorized user to delete this blog" })
      .end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
