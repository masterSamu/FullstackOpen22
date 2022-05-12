const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./blog_test_helper");
const app = require("../app");
const api = supertest(app);

describe("user creation", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("Valid user can be added", async () => {
    const usersAtStart = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(0);

    const newUser = {
      username: "newTestUser",
      name: "test user",
      password: "salamanteri",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("Username must be unique", async () => {
    const usersAtStart = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(0);

    const newUser = {
      username: "newTestUser",
      name: "test user",
      password: "salamanteri",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await helper.usersInDb();
    expect(users).toHaveLength(1);

    const usernames = users.map((user) => user.username);
    expect(usernames).toContain(newUser.username);

    // Trying to add user with same username again
    const newUser2 = {
      username: "newTestUser",
      name: "copy test user",
      password: "salamanteri",
    };
    const response = await api
      .post("/api/users")
      .send(newUser2)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const error = response.body.error;
    expect(error).toBeDefined();
    expect(error).toEqual("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(1);

    const names = usersAtEnd.map((user) => user.name);
    expect(names).not.toContain(newUser2.name);
  });

  test("Username shorter than 4 can't be added", async () => {
    const usersAtStart = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(0);

    const newUser = {
      username: "new",
      name: "test user",
      password: "salamanteri",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const error = response.body.error;
    expect(error).toBeDefined();
    expect(error).toEqual("username must be longer than 3 characters");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(0);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test("Password shorter than 4 can't be added", async () => {
    const usersAtStart = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(0);

    const newUser = {
      username: "newTestUser",
      name: "test user",
      password: "sal",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const error = response.body.error;
    expect(error).toBeDefined();
    expect(error).toEqual("password must be longer than 3 characters");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(0);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });

  test("Password shorter than 4 can't be added", async () => {
    const usersAtStart = await helper.usersInDb();
    expect(usersAtStart).toHaveLength(0);

    const newUser = {
      username: "newTestUser",
      name: "test user",
      password: "sal",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const error = response.body.error;
    expect(error).toBeDefined();
    expect(error).toEqual("password must be longer than 3 characters");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(0);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).not.toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
