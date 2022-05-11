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
    const response = await helper.blogsInDb();
    expect(response).toHaveLength(helper.initialBlogs.length);
  });

  test("Blogs have identifier field called 'id'", async () => {
    const response = await helper.blogsInDb();
    response.forEach((blog) => {
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

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(blogsAtEnd[helper.initialBlogs.length].title).toContain(
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

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  });

  test("Blog without title and url gets response status 400", async () => {
    const blogWithoutTitleAndUrl = { author: "Tony Stark", likes: 4 };
    await api.post("/api/blogs").send(blogWithoutTitleAndUrl).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("/api/blogs HTTP DELETE pyyntö", () => {
  test("Delete one blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const blog = blogsAtEnd.map((b) => b.title);
    expect(blog).not.toContain(blogToDelete.title);
  });
});

describe("/api/blogs HTTP PUT pyyntö", () => {
  test("Update likes for blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = blogsAtStart[0];
    newBlog.likes = newBlog.likes + 1;

    await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const blog = blogsAtEnd.find((blog) => blog.id === newBlog.id);
    expect(blog.likes).toBe(11);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
