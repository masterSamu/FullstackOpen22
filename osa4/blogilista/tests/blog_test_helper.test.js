const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Iron Man 3 returns",
    author: "Tony Stark",
    url: "www.google.com",
    likes: 10
  },
  {
    title: "Hulk is green!",
    author: "Bruce Banner",
    url: "www.google.com",
    likes: 7
  },
];

const blogsInDb = () => {
  const blogs = Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs, blogsInDb
}
