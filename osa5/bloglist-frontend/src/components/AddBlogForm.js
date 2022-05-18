import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";

export default function AddBlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
