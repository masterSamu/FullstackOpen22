const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Iron Man 3 returns",
    author: "Tony Stark",
    url: "www.google.com",
    likes: 10,
  },
  {
    title: "Hulk is green!",
    author: "Bruce Banner",
    url: "www.google.com",
    likes: 7,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((map) => map.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
