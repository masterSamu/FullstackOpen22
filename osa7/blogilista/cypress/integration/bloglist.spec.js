/* eslint-disable cypress/no-unnecessary-waiting */

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Samu Testaaja",
      username: "samu",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("login").click();
    cy.get("form")
      .should("contain", "username")
      .and("contain", "password")
      .and("contain", "login");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.contains("Log in to application");
      cy.contains("login").click();
    });
    it("succeeds with correct credentials", function () {
      cy.get("input[name=Username]").type("samu");
      cy.get("input[name=Password]").type("salainen");
      cy.get("#login-button").click();
      cy.get("html").contains("Samu Testaaja logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name=Username]").type("samu");
      cy.get("input[name=Password]").type("salaisuus");
      cy.get("#login-button").click();
      cy.get("html").should("not.contain", "Samu Testaaja logged in");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    const blog = {
      title: "For Cypress testing",
      author: "Cyperss Tester",
      url: "www.google.com",
      likes: 0,
    };
    beforeEach(function () {
      cy.login({ username: "samu", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("Add new blog");
      cy.contains("Create").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("button[type=submit]").click();
      cy.get("html").contains(`${blog.title} ${blog.author}`);
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      });

      cy.contains(`${blog.title} ${blog.author}`)
        .parent()
        .find("button")
        .click();
      cy.contains(`Url: ${blog.url}`);
      cy.contains(`Likes: ${blog.likes}`).find("button").click();
      cy.contains(`Likes: ${blog.likes + 1}`);
    });

    it("A Blog can be removed by creator", function () {
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      });

      cy.contains(`${blog.title} ${blog.author}`)
        .parent()
        .find("button")
        .click();
      cy.contains(`Url: ${blog.url}`);
      cy.contains("Remove").click();
      cy.get("html").should("not.contain", `${blog.title} ${blog.author}`);
    });

    it("Blog can't be removed by other user than creator", function () {
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      });

      const user = {
        name: "Samu Tester",
        username: "tester",
        password: "salainen",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.login({ username: user.username, password: user.password });

      cy.contains(`${blog.title} ${blog.author}`)
        .parent()
        .find("button")
        .click();
      cy.contains(`Url: ${blog.url}`);
      cy.contains("Remove").click();
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").contains(`${blog.title} ${blog.author}`);
    });

    it("Blogs are sorted by likes", function () {
      cy.createBlog(blog);
      cy.createBlog({
        title: "For integration tests",
        author: "Integration Tester",
        url: "www.google.fi",
        likes: 1,
      });

      cy.get(".blog").eq(0).should("contain", "For integration tests");
      cy.get(".blog").eq(1).should("contain", blog.title);

      cy.contains(`${blog.title} ${blog.author}`)
        .parent()
        .find("button")
        .click();
      cy.contains(`Url: ${blog.url}`);
      cy.contains(`Likes: ${blog.likes}`).find("button").click();

      cy.wait(3000).then(function () {
        cy.contains(`Likes: ${blog.likes + 1}`)
          .find("button")
          .click();
      });
      cy.wait(3000).then(function () {
        cy.get(".blog").eq(0).should("contain", blog.title);
        cy.get(".blog").eq(1).should("contain", "For integration tests");
      });
    });
  });
});
