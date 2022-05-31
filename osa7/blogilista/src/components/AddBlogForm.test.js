import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlogForm from "./AddBlogForm";

describe("AddBlogForm component tests", () => {
  const createBlog = jest.fn();
  beforeEach(() => {
    render(<AddBlogForm createBlog={createBlog} />);
  });

  test("createBlog function has the correct values when submit", async () => {
    const title = screen.getByPlaceholderText("Title");
    expect(title).toBeInTheDocument();

    const author = screen.getByPlaceholderText("Author");
    expect(author).toBeInTheDocument();

    const url = screen.getByPlaceholderText("Url");
    expect(url).toBeInTheDocument();

    const blog = {
      title: "Testing blog form",
      author: "Samu",
      url: "www.google.com",
    };

    const user = userEvent.setup();
    await user.type(title, blog.title);
    await user.type(author, blog.author);
    await user.type(url, blog.url);

    const submitButton = screen.getByText("Create");
    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
  });
});
