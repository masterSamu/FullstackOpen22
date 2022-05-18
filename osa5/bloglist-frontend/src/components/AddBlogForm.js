import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export default function AddBlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Url"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
