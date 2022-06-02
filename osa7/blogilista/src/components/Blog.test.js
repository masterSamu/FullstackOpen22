import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { MemoryRouter } from "react-router-dom";

describe("Blog component tests", () => {
  const blog = {
    title: "React test",
    author: "Samu",
    likes: 1,
    url: "www.google.com",
    user: "123456",
  };
  const deleteBlog = jest.fn();
  const updateBlog = jest.fn();
  beforeEach(() => {
    render(
      <Blog blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog} />,
      { wrapper: MemoryRouter }
    );
  });

  test("Component renders title and author, but not likes and url", () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeDefined();

    const likes = screen.queryByText(`Likes: ${blog.likes}`);
    expect(likes).not.toBeInTheDocument();

    const url = screen.queryByText(`Url: ${blog.url}`);
    expect(url).not.toBeInTheDocument();
  });

  test("Url and likes are visible when button is clicked", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("Expand");
    await user.click(button);

    const likes = screen.queryByText(`Likes: ${blog.likes}`);
    expect(likes).toBeInTheDocument();

    const url = screen.queryByText(`Url: ${blog.url}`);
    expect(url).toBeInTheDocument();
  });

  test("Press like button twice", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("Expand");
    await user.click(button);

    const likeButton = screen.getByTestId("likeButton");
    expect(likeButton).toBeInTheDocument();

    await user.click(likeButton);
    await user.click(likeButton);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
