import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

export default function AddBlogForm({ blogs, setBlogs, setNotification }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      if (blog) {
        setBlogs(blogs.concat(blog));
        setNotification({
          type: "success",
          message: `New record "${title}" by ${author} saved.`,
        });
      }
    } catch (error) {
      setNotification({ type: "error", message: error.message });
    }
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
