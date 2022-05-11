const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./blog_test_helper.test");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

describe("/api/blogs HTTP GET pyyntö", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there is 2 blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("Blogs have identifier field called 'id'", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("/api/blogs HTTP POST pyyntö", () => {
  test("Valid blog is added", async () => {
    const newBlog = {
      title: "Captain America lost his shield!",
      author: "Steve Rogers",
      url: "www.google.com",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1);

    expect(blogsAtEnd.body[helper.initialBlogs.length].title).toContain(
      newBlog.title
    );
  });

  test("Blog without likes set value to 0", async () => {
    const newBlog = {
      title: "Iron Man saved Spider-Man's life!",
      author: "Tony Stark",
      url: "www.google.com",
      likes: undefined,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd.body[helper.initialBlogs.length].likes).toBe(0);
  });

  test("Blog without title and url gets response status 400", async () => {
    const blogWithoutTitleAndUrl = { author: "Tony Stark", likes: 4 };
    await api.post("/api/blogs").send(blogWithoutTitleAndUrl).expect(400);

    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
