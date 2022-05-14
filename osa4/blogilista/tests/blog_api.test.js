const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./blog_test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const userToLogin = { username: "blogTestUser", password: "salamanteri" };

beforeAll(async () => {
  // Logging in with user
  const testUser = {
    username: "blogTestUser",
    password: "salamanteri",
    name: "test user",
  };
  await api.post("/api/users").send(testUser).expect(201);
});

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
    const userResponse = await api
      .post("/api/login")
      .send(userToLogin)
      .expect(200);

    const user = userResponse.body;

    const newBlog = {
      title: "Captain America lost his shield!",
      author: "Steve Rogers",
      url: "www.google.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${user.token}`)
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
    const userResponse = await api
      .post("/api/login")
      .send(userToLogin)
      .expect(200);

    const user = userResponse.body;

    const newBlog = {
      title: "Iron Man saved Spider-Man's life!",
      author: "Tony Stark",
      url: "www.google.com",
      likes: undefined,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  });

  test("Can't add blog without title and url, gets response status 400", async () => {
    const userResponse = await api
      .post("/api/login")
      .send(userToLogin)
      .expect(200);

    const user = userResponse.body;

    const blogWithoutTitleAndUrl = { author: "Tony Stark", likes: 4 };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${user.token}`)
      .send(blogWithoutTitleAndUrl)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("Can't add blog without authorization token", async () => {
    const newBlog = {
      title: "Adding blog without token",
      author: "Steve Rogers",
      url: "www.google.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const blog = blogsAtEnd.map((b) => b.title);
    expect(blog).not.toContain(newBlog.title);
  });
});

describe("/api/blogs HTTP DELETE pyyntö", () => {
  test("Delete one blog", async () => {
    const userResponse = await api
      .post("/api/login")
      .send(userToLogin)
      .expect(200);
    const user = userResponse.body;

    // Create new blog to delete
    const newBlog = {
      title: "Blog to delete!",
      author: "Steve Rogers",
      url: "www.google.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    expect(blogsAtStart).toHaveLength(helper.initialBlogs.length + 1);
    const blogToDelete = blogsAtStart.find(
      (blog) => blog.title === newBlog.title
    );

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${user.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const blog = blogsAtEnd.map((b) => b.title);
    expect(blog).not.toContain(blogToDelete.title);
  });
});

describe("/api/blogs HTTP PUT pyyntö", () => {
  test("Update likes for blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = blogsAtStart[0];
    newBlog.likes = newBlog.likes + 1;

    await api.put(`/api/blogs/${newBlog.id}`).send(newBlog).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const blog = blogsAtEnd.find((blog) => blog.id === newBlog.id);
    expect(blog.likes).toBe(11);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
